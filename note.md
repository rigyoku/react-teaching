# 01

## 前言
* 前端基础 / node环境 / vscode(md/tailwind) / chrome
* 提供笔记, 代码和视频(大概每周末更新)
* 偶尔会有小作业作为评估依据

## init
* 为什么是next而不是react
    * react官方一直在推的框架
    * 和react差异
        * 全栈: 内置api支持
        * ssr: 服务端渲染, 更好的seo(更容易被百度到)
        * 路由: 不再是引入react-router, 内置页面路由
            * 后续课程再展开
* 初始化
    ```sh
    npx create-next-app@latest
    ```
    * 修改tsconfig.json中的moduleResolution为"NodeNext"
* 核心文件
    * app: 脚本(js/css)
        * 先关注page文件即可, 后续会在路由阶段展开
    * public: 静态资源(图片/字体)
    * tailwind.config.ts: 基于tailwind的封装
    * next.config.mjs: 配置项(webpack/proxy)
    * api: 接口开发
    * env: 环境变量

## api
* api目录下视为接口
* 对应文件夹下的route文件用于处理rest请求
    * post => create
    * get => read
    * put => update
    * delete => delete
* 低版本ts使用NextResponse.json, 高版本可以直接用Response.json返回json
* 获取请求参数
    * post: 通过json取值
        * 测试post: await fetch('http://localhost:3000/api/info', {method: 'post', body: JSON.stringify({name: 'liy'})})
    * get: 通过url的searchParams取值
    * 动态路由: 通过params取值

## env
```sh
npm install cross-env
```
* 通过后缀区分环境
    * 只能区分development,test,production
    * 对应的local会覆盖原本对应环境的配置
* 默认只能被服务端使用, 添加NEXT_PUBLIC_前缀可以被客户端使用

## proxy
```sh
npm install axios
```
* 对比ssr和传统客户端请求
* 通过rewrites配置proxy
