# 05

## react cache
* 参数为一个方法, 方法的返回值作为缓存内容
* 返回值为包装后的方法
* 用于避免重复执行耗时操作
    * 约等于 使用context取值 + 判断没值再执行
* 调用时如果参数一样, 则不会重新执行cache参数的方法, 会直接返回值
    * key判断引用(object.is)
    * 同key时, 因为方法不会执行, 第一次如果抛异常, 后续也会使用异常的缓存
* 每次执行包装都会返回新的包装结果
    * 包装放在组件外(避免重复包装)
    * 使用要放在组件内
* 配合服务端组件使用, 用于创建组件外的缓存
    * 区别useMemo: 客户端, 单个组件
    * cache: 服务端, 跨组件
* 影响缓存
    * refresh会清缓存
    * server action不会清缓存
        * 但是action内容执行特殊操作会清, 比如revalidatePath
    * 跳到新路由/f5会清缓存
        * 注意跳转后layout和template不会自动更新服务端数据, 所以用的还是旧数据
        * 操作history不会清缓存

## next fetch

### 请求层(next-fetch)
* 服务器组件渲染期间, 针对请求的缓存
    * 参数一致则不会再发出fetch请求
    * 可以传递signal来禁用
    * dev环境初次取值可以看出请求缓存的效果
* 源码解析
    * 被patch-fetch包装
    * 将fetch属性添加到cachedFetch上, 并赋值给fetch
    * cachedFetch
        * 配置了 *signal* 直接走普通fetch
        * 根据配置生成缓存key
            * 指定url且配置为空(即get请求), 固定字符串的缓存key
            * 不是get和head, 或者keepalive的请求, 直接走普通fetch
            * 否则根据配置项生成缓存key
        * 取缓存
            * 根据url取react.cache, 取不出来走普通fetch, 并把fetch的promise记录到缓存中
            * 通过key没取到缓存, 走普通fetch, 并把fetch的promise记录到缓存中
            * 有缓存则直接使用缓存的value来注册then回调并返回
            * clone一个response, 因为默认只能读一次
            ```js
            a = await fetch('https://exam.dlufl.edu.cn/info/1056/1700.htm')
            a.body.values()
            ```
    * dev只有初次进入next-fetch, 后续就会走process/pre_execution, 所以后续看不到缓存效果