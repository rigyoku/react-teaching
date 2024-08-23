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