# 01

## init
* 为什么是next而不是react
    * react官方一直在推的框架
    * 和react差异
        * 全栈: 内置api支持
        * 服务端组件: 服务端渲染, 更好的seo(更容易被百度到)
            * 默认都是服务端组件, 切换成客户端组件使用'use client'声明
            * 客户端组件可以当作传统react组件
        * 路由: 内置基于目录的路由功能
* 为什么要做monorepo, 为什么用Turborepo
    * monorepo就是把多个项目放在一个代码库里进行管理
        * 优点: 共享代码和依赖, 一致性, 快速部署
        * 缺点: 安全性问题, repo过大
    * Turborepo和next都是vercel的产品
* 初始化
    ```sh
        npx create-turbo@latest
        # 建议全局安装
        npm i turbo -g

        # 禁用检测功能, 屏蔽error log
        npx next telemetry disable
    ```
* debug
    * vscode配置launch.json来debug服务端组件
    ```json
        {
            "name": "Launch Program",
            "program": "node_modules/turbo/bin/turbo",
            "args": ["dev"],
            "request": "launch",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "type": "node"
        }
    ```
    * [安装tool来debug客户端组件](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en&pli=1)

## turbo
* 默认开启缓存, 文件不变时会hit-cache
* 目录结构
    * apps: 工程代码
        * 采用next框架
            * ts + app_router
            * 未安装tailwind
    * node_modules: 所有工程的依赖
    * packages: 共享库
        * package.json
            * name: 包名, 用于import时匹配
            * exports: 为暴露的文件路径起别名
            * imports: 为文件路径起别名, 可以用通配符, 可以用于引入的路径
    * package.json: 
        * workspaces: 指定目录下, 带有package.json的文件夹作为包
    * turbo.json: 配置task
        * 通过turbo命令可以直接调用
* 配置
    * 全局
        * ui: tui能交互, stream只能输出
        * globalDependencies: 参数文件如果产生变化时miss-cache
        * globalEnv: 环境变量参数变化时miss-cache
        * globalPassThroughEnv: 除了env/globalEnv, 可以在代码中使用的非.env文件声明环境变量
    * task
        * 直接命名是针对所有子工程的script, 可以通过packName#scriptName针对指定工程
        * cache: 可以设false禁用缓存
        * env: 可用环境变量, 变化时miss-cache, 支持*通配符和!排除
        * passThroughEnv: 可用环境变量, 变化时不影响hit-cache
        * input: 输入的内容, 可以通过!屏蔽指定文件对hit-cache的影响
        * output: 要缓存的输出内容的目录
            * 指定目录后, 在hit-cache后会恢复该目录
        * dependsOn: 依赖项, 会先执行依赖
            * 可以用 packName#scriptName 指定依赖
            * ^表示递归依赖来执行该任务
            * 直接写表示同级的任务
        * outputLogs: 日志等级
        * persistent: 持久任务, 防止被依赖, 默认接受输入
            * interactive: 接收输入
* 运行参数
    * --workspace=xx 安装包时指定安装在哪个子工程
        ```sh
            # 实际只会存在一个, 目的是为了避免幽灵依赖
            npm i axios --workspace=docs --workspace=web 
        ```
    * --filter 只在对应工程执行script
    * --force 强制执行
    * --dry 查看调试log

## env
* 存放在根目录, 通过后缀区分环境, 对应NODE_ENV的值
    * 所有环境共用.env
    * 只能区分3个环境
        * development
        * test
        * production
    * .local优先级更高, 且被gitignore了
        * 工程启动时会显示使用的环境变量, 优先级从前到后
            ```log
                - Environments: .env.development.local, .env.local, .env.development, .env
            ```
* 通过process.env来使用
    * 默认只能被服务端使用, 添加NEXT_PUBLIC_前缀可以被客户端使用
    * 可以运行时修改环境变量的值
* 变量的值可以换行(双引号扩起来)
* 变量的值可以通过$引用其他变量的值(取得优先级最高的值, 而非当前文件值)
    * 运行时修改环境变量的值不会影响$的取值
* 不建议使用next.config加环境变量

## next.config
* distDir: 打包文件保存目录
* basePath: 配置url的根路径, 必须斜线开头
    * 图片的src需要对应调整
* images: 图片加载的配置, 配合cdn, 比如可以接入aws的cloudfront
* output: 打包配置
    * standalone, 打包时自动加入node_module依赖, 可以直接启动server.js
* headers: 针对指定请求设置响应头, 常添加一些安全性相关, 比如跨域, iframe, xss相关头
    * 可以用:xx作为占位符, *做通配符
    * 可以用has/miss判断请求的k/v
    * 可以配置locale屏蔽国际化的url
* redirects: 重定向请求
    * 支持通配符, 查询, 国际化
    * 注意basePath, 不想自动拼接时设false
    * permanent false307 true308
* rewrites: 重写请求, 作用于客户端
    * 外部映射可以避免跨域问题
    * 支持通配符, 查询, 国际化
    * 注意basePath, 不想自动拼接时设false
* serverActions: 修改bodySizeLimit限制请求大小(默认1m)