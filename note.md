# 03

## app router
* app router在next13开始使用, 文件存放app目录下, 基于文件系统的路由
* app下每个文件路径对应url的路径 
    * 特殊路径比如路由组和动态路由后续再介绍
    * 并非所有路径都能访问
        * api下有route的文件夹
        * 其他有page的非私有文件夹
            * _开头就是私有文件夹
* 所有文件默认都是服务端组件
## 基础页面
* page
    * 用于显示页面(后缀是js,jsx,tsx都行, 后续的其他路由结尾同理, 省略后缀)
    * 直接返回一个默认的函数组件即可显示
    * 可以获取searchParams(kv)
    * 客户端组件通过 usePathname 获取当前路由
## 切换路由
* 通过Link组件切换
    * 渲染成a标签, 可以传href和children, 可以带锚点
        * 可以通过props禁用锚点
    * 可见时预加载link的内容
        * 可以通过prefetch禁用
        * 打包才能看效果
* useRouter
    * 客户端使用, 无参, 返回路由对象
        * 注意从 next/navigation 引入
    * history相关
        * push: 参数为url, 向history加一条
            * 可以禁用锚点
        * replace: 参数为url, 替换当前路由
            * 可以禁用锚点
        * back: 无参, 从history倒退
        * forward: 无参, 从history向前
        * 不建议手动操作history, 避免混淆push和pushState
    * refresh
        * 刷新服务端组件, 不影响客户端组件
        * 清除预加载的缓存
            * f5也会失效
    * prefetch
        * 参数为url, 手动预加载
        * 同样只有打包才可用
    * back/forward默认记录滚动位置
* redirect
    * 服务端使用, 参数为重定向的url, 类型可以为replace/push
    * 不能放try里
## 共享UI
* laytout
    * 切换路由时, layout会进行保留, 不会重新渲染
        * Link组件会保留, 通过a标签切不行
        * 直接使用usePathname会重新渲染, 可以单独起一个客户端组件去做然后引入layout
    * 也是函数组件, 接收children
    * 根布局必须存在, 且包含html和body元素
        * 默认的根布局还提供了metadata配置
            * 其他layout也可以改metadata
        * 且只有根路由能有html和body元素
    * 拿不到searchParams
* template
    * 切换路由时, template会新建
        * 所以可以用于重置状态
    * 也是函数组件, 接收children
        * 在layout和page之间
    * 拿不到searchParams, 可以拿到usePathname
## 加载效果
* 路由级别
    * loading
        * 在template和page之间
* 组件级别
    * 通过Suspense动态加载, 通过fallback配置loading效果
## 错误页
* error
    * 用于处理意外的错误, 必须是客户端组件
    * 可以接受error和reset参数
        * 打包后拿不到完整error
        * reset用于重新渲染
    * 可以多层处理, 从下向上处理
## 404
* not-found
    * app目录下的全局拦截
## 路由组
* 把一组路由放在一个文件夹下归类, 这个文件夹不会出现在url中
* 小括号括起来
    * 不同的组可以有不同的layout
    * 组下面的page不能导致路由冲突
* 可以嵌套
## 动态路由
* 中括号括起来
* 文件夹名就是key, 通过props.params.key取值
* layout和page能拿到, template拿不到
* generateStaticParams
    * 暴露该方法, 返回params数组, 这样就会在build阶段做缓存
    * 暴露dynamicParams为false可以禁用未定义的参数, 返回404
* 支持多级嵌套
* 支持扩展运算符
    * 多层只能写在最后
    * 可以用双中括号加扩展运算符表示可选参数
## 平行路由
* layout里显示多个内容
    * 如果有template, 每个page都会带上
* @开头的文件夹
    * 可以写layout
* 插槽内也可以有路由结构, 和当前url匹配
    * 不匹配时, 取决于触发方式
        * 通过link迁移时, 插槽会保持初始路由
        * f5时, 会渲染default
* 在平行路由层级可以开始写下列文件, 会优先使用下级的
    * default
    * loading
    * error
* 在layout/template可以用useSelectedLayoutSegment/s传插槽名, 拿到该插槽当前路由
## 拦截路由
* 在当前路由下通过(.)/(..)/(...)去拦截, 和直接访问该url达到内容不一致的效果
    * 不是按文件夹算, 是按照实际路由算
    * ...是app目录
    * 可以嵌套
## api
* route
    * 一般放在api下, ts/js
        * 不放也行, tsx也行
        * 但是不能和page同级
    * 暴露 POST(create)/GET(read)/PUT(update)/PATH(delete)
        * 也支持 PATH(局部更新)/HEAD(没body)/OPTIONS(查询支持的方法)
        * 不能返回default
    * 可以从参数拿到请求数据(header,cookie,fordata之类), 返回NextResponse对象
        * 表单数据为异步, 配合post请求
        * req.nextUrl.searchParams.get('key')获取参数
        * 暴露dynamic为force-static会导致拿不到参数
        * 返回值也可以写code和header
    * 可以配合路由组,动态路由
        * 获取params
    * 可以重定向
## 中间件
* middleware
    * 根目录下的全局拦截(注意不是app目录), 在匹配到page前进行处理
    * 一些拦截处理, 比如认证,log,响应处理等轻任务
    * 暴露middleware方法写处理逻辑, 暴露config用于指定配置
        * middleware方法:
            * 接收request参数
                * 由于全局唯一, 不同的路由逻辑自己写判断去做路径匹配
                * 通过NextResponse.next额外处理并放行请求, 或者直接响应请求, 或者重定向
                    * 重定向用NextResponse.redirect, 且不能是相对路径, 可以在url上clone去改pathname
        * config.matcher: 哪些路由要进入处理逻辑
            * 可以是字符串, 数组, 使用has/missing逻辑的对象, 正则
            * 不配就是全局有效
    * 只支持Edge的运行时, 某些api不好用(比如eval)
## 国际化
* 不同语言做到不同的动态路由下
* 中间件自动重定向