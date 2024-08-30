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