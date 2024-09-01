# 04

## server data
* api
    * 异步调用fetch, 并异步转成json来使用
    * 纯静态页面会在build时调用fetch来预构建
        * fetch设置no-sotre来禁用构建时调用
            * 只会隔离那行之后的代码, 之前的还是会执行并且访问时再次执行
        * 可以在组件内执行unstable_noStore方法来禁用构建时调用
            * 也是代码级别
            * 能catch到异常
        * 暴露dynamic为force-dynamic也可以达到禁用效果
        * 一个文件级别, 两个代码级别
* db
    * 纯静态页面去查db(mysql,prisma)也会预构建
        * mysql
            ```sh
            npm i mysql2
            ```
            * createConnection配置连接
            * connect开始连接
            * query进行查询
        * prisma
            ```sh
            npm i prisma
            npx prisma init
            # 修改配置文件, 指定参数
            npx prisma db pull
            npm i @prisma/client
            npx prisma generate
            ```
            * 通过PrismaClient实例取值
        * unstable_noStore和dynamic同样可用
* 性能
    * 利用fetch的缓存特性, 提前去触发子组件的fetch
        * 因为函数组件的return才是渲染的地方, 写在await后会在父组件异步结束后再渲染子组件
    * 配合promise并行
* 数据安全
    * 通过server-only库来防止客户端使用
        ```sh
        npm i server-only
        ```
        * 引入不会, 引入并实际使用才会抛异常, 上层传入也不会
    * 为数据打污点, 防止流入客户端
        * react的实验性api, 需要在next配置文件开启
        * experimental_taintObjectReference, 接收errMsg和对象, 无返回值
            * 只会处理对象的引用, 对象的值不会处理
        * experimental_taintUniqueValue, 接收errMsg, obj和obj.val, 无返回值

## client data
* 从api取数据时, 可以用effect在初始化时候fetch
* 三方库来包装请求
    ```
        # 先降一下版本, 都是18.2的react依赖
        # 19.0.0-rc-f994737d14-20240522 => 18.2.0
        # 15.0.0-rc.0 => 14.1.4
        # 添加rewrite避免跨域, 调整api的代码让重复请求效果不一致
    ```
    * [swr](https://swr.vercel.app/zh-CN/docs/getting-started)
        * 通过useSWR去请求, 提供缓存, 重发等功能
            * 参数1(key)为的值传入参数2的方法, 参数2(可选)是实际发请求的方法, 参数3(可选)是配置项
                * 参数1: 
                    * 缓存的key, 判断相同使用值而非引用
                    * 广义false或者通过方法抛异常都不会触发这个请求
                        * key使用上一个请求拿到的数据来触发异常
                * fetcher: 可以省略, 写到配置项里, 返回promise对象或者value
            * 返回值是个对象
                * data: 查询的数据, 没查完是undefined
                * error: fetcher抛的错, 没错是undefined
                * isLoading: 是否在没缓存情况下请求
                * isValidating: 是否重新验证
                    * 区别于loading, key变了就重新验证, 但是命中缓存就不会loading
                * mutate: 更改缓存的方法, 参数1是新数据或者方法(返回值作为新数据), 参数2是配置, 返回值是新数据或者新数据的promise
                    * revalidate: 可以禁用默认的重发效果
                    * optimisticData: 乐观更新ui
        * SWRConfig进行配置共有, 类似context
            * 多层使用时下层最优先
            * 可以通过函数形式拿到上层配置
                * 值为对象时, 不是整体覆盖, 可以做merge
            * provider为缓存对象, 不提供则使用上层的
            * useSWRConfig可以获取该配置
                * 可以通过cache拿到缓存对象
                * 通过mutate更改缓存和局部的mutate效果一致
        * 参数3的配置项:
            * onSuccess: 拿到data的回调
            * fallback: kv形式的默认值
            * refreshInterval: 自动刷新间隔
                * revalidateOnFocus: (浏览器页面级别)焦点变更时重发
                * revalidateOnReconnect: 断网重连后重发
                * revalidateIfStale: 有缓存也重发
                * focusThrottleInterval: 焦点变更截流
                * dedupingInterval: 请求截流
            * onError: 异常回调
                * shouldRetryOnError: 错误时重试
                * errorRetryInterval: 第一次重试间隔
                * errorRetryCount: 错误时重试的最大次数
            * loadingTimeout: loading超时
                * onLoadingSlow: loading超时回调
    * [react-query](https://tanstack.com/query/latest/docs/framework/react/installation)
        * 和swr差不多, 也是key+fetcher+options形式的hook
            * 外面的provider是必须的