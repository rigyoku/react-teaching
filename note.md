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

### 数据层(store)
* 针对数据缓存
    * 可以理解为服务端的swr
        * 如果有缓存, 先显示缓存, 不显示Suspense
        * 缓存过期时, 下次访问时在后台取新数据, 成功后缓存更新为新数据
            * 触发重验证的那次请求, 看不到最新值
    * build(静态)和访问期间(动态)都能触发
    * 配置项
        * cache: 默认开启缓存, 设置no-store会禁用
        * next:
            * revalidate: 数据有效期
                * 单位是秒
                * false永不过期
                * 动态路由不设置相当于0
            * tags: 用于清除缓存的key
    * 手动清除缓存
        * revalidatePath 路由级别缓存全部清除
            * 包括该路由上面的layout/template
        * revalidateTag 单个请求级别
            * 传入任意tag都可以
        * 触发api需要手动刷新(f5/router.refresh), action自动刷新
        * 只能在serverAction/api里执行
    * 非fetch的方法可以用unstable_cache包裹

### 缓存小节
* 路由级别也可以配revalidate, 影响page的重构
    * 不会影响fetch的缓存
* 客户端级别有layout的和history的缓存, 以及preload
* 使用不频繁的页面, 可以把Link的prefetch禁用
* 在服务端组件中
    * 方法的缓存: react.cache/unstable_cache
    * 利用请求级别缓存, 在父组件异步发起子组件的请求做预加载加速渲染
    * 对于数据几乎不变的页面, 直接做成静态的在build时预渲染, 动态路由通过提前指定参数的形式也在build阶段优化
    * 比如db的数据每天有batch来更新, 可以把这些数据的查询利用数据缓存做控制, 平时使用缓存, 在batch结束后触发一个api来清缓存数据做同步
    * 时效性要求不高的场合, 比如查看数据走势, 设置数据有效期, 减少频繁分析的性能损耗
    * 做数据修改的form, 对应action清缓存更新页面数据

## Next的渲染模式
* 静态渲染: 无动态内容 / force-static
    * 会先生成一版html, 在.next/server/app下
* SSG: 动态路由的静态参数
    * 根据参数生成对应html
* 动态渲染: 使用运行时数据 / unstable_noStore / force-dynamic / revalidate = 0