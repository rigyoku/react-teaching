# 02

## react hook
* react(18.3.1/19-beta)内置的hook有下面17个
* 严格模式dev环境hook操作会连续执行2次来排查错误
* 规则
    * use开头
    * 写在顶层(不能在循环,if,事件处理等等里面)
    * 只在函数组件和自定义hook里使用hook(不在普通函数使用)

### 状态
* useState(让函数组件拥有状态)
    * 参数是状态的初始值
        * 参数可以是无参函数, 返回值作为初始值
            * 注意不要直接调用函数
        * 初始化值只生效一次, 可以用于记录第一次传入的props(后续变更无法察觉)
    * 返回状态当前值和更改状态方法(setState)的数组, 常用解构取值
    * setState可以直接写新状态, 也可以写函数接受当前状态返回新状态
        * 更新状态是放入队列然后异步更新, 直接取拿不到最新值, 可以在setState的函数参数的参数里拿到
            * 尽可能不用flushSync
        * 新旧状态一致(Object.is)时不会重新渲染
    * 渲染阶段(顶层代码)只能 ***有条件的*** 调用当前组件setState, 不能调用其他组件setState
    * 定义时候规范
        * 尽可能少的状态数量
        * 尽可能浅的状态结构
* useReducer(状态管理的聚合)
    * 参数
        * 参数1: 是一个方法, 方法参数是(当前)state和action, 根据action来更新state并返回更新后的state
        * 参数2: 初始值, 或者计算初始值的方法
        * 参数3: 可选参数, 有值则作为参数2方法的参数计算初始值
    * 返回当前状态和更新状态的方法(dispatch)的数组, 常用解构取值
        * dispatch用于触发参数1的方法, 传入action
    * 特性和setState一致, 注意不要写异步请求
    * 针对于state的改修逻辑很多时才建议使用reducer, 逻辑分离单独调试会更方便
    * [use-immer库](https://github.com/immerjs/use-immer): 对useState的包装, 封装了对象的变更操作
* useOptimistic(乐观更新UI)
    * 乐观就是先把ui给更新了, 但是异步操作没结束(db还没插进去)呢, 等异步结束之后再更新ui
        * 乐观更新适用于成功率极高, 可以撤回的场合
    * 参数
        * 参数1: 初始值
        * 参数2: 是一个方法, 方法参数是(当前)state和待更新的值, 返回乐观state(临时副本)
            * 注意是临时副本, 原state并未变化, 所以是可撤回的, 同时异步操作正确结束时也可以更新正确的值
    * 返回临时副本和更新状态的方法(addOptimistic)
        * addOptimistic的参数就是参数2的待更新的值

### 上下文
* useContext(数据共享)
    * createContext: 创建上下文, 参数提供默认值
    * useContext: 参数传入context, 返回(最近的父级provider)值
    * context.provider: 覆盖默认值, 可以多层覆盖(包括多provider)
    * 下层修改数据: 虽然setState也可以, 常用dispatch
    * 使用事项
        * 传值方式适合场景
            * 短传递用props
            * 单个孙子层使用的话用children参数
            * 多层都要使用, 使用的值可以切换的时候用context
        * 按照业务拆分context, 管理和使用更方便, 使用时再拼接成对应业务的provider组件
        * 使用memo缓存中间层, 不会影响孙子拿到最新context重新渲染

### 副作用
* useEffect(模拟生命周期)
    * 副作用: 除了本身要做的事, 还产生了额外的效果
    * 参数1为依赖发生变化时(Object.is)要触发的函数, 参数2为依赖数组
        * 参数1
            * 渲染后执行
            * 不能是异步的
            * 使用的外部变量要添加依赖, 配置了lint的话会提示
                * [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks-rc)
                * 用函数式setState隐藏state依赖
            * 返回值为函数, 在组件卸载时触发
                * 刷新时, 先执行返回函数, 再执行参数1
                * 清理计时器, abort请求, 移除事件监听
        * 参数2
            * 不传时, 每次渲染都会触发
            * 传递空数组时, 只有初始化会执行
            * 数组有值, 内容变化时触发
    * 常用于初始化时候发请求, 操作dom
        * 真正唯一的操作应该放在文件头上
* useLayoutEffect(不可见的渲染)
    * 重绘前触发的useEffect, 会影响性能
        * 虽然重新渲染, 但是用户看不出来
        * 依赖渲染出来的内容更新ui时才会用到
* useInsertionEffect(css-in-js)
    * 为了在dom上添加style标签导入css
    * 参数和useEffect相同, 执行顺序为 useInsertionEffect > useLayoutEffect > useEffect
    * refs无效, setup/cleanup同时触发

### ref
* useRef(保存不用于渲染的值)
    * 用于保存不需要渲染的值
        * 相较于普通局部变量, 渲染不会重置
        * 相较于state, 不会影响页面渲染
        * 相较于全局变量, 每个组件独立
    * 参数是初始值, 返回的对象永远不变, 只会变更current
        * 渲染期间不要用ref的current
    * 为dom的ref属性赋值, 可以通过current拿到dom
        * ref属性可以接收函数参数, 手动保存dom
        * 可以上层创建ref, forwardRef传递给子组件的dom
            * 基本组件才可以这么做, 复杂组件别做, 不然行为不好预测
* useImperativeHandle(子组件为ref.current赋值)
    * 配合forwardRef
        * 不再直接把ref放入dom, 避免暴露整个dom, 而是暴露自定义的方法
    * 参数1是ref, 参数2是方法, 参数3是参数2方法的依赖数组
        * 参数2的方法无参, 返回值作为ref的current

### 性能
* useMemo(缓存结果)
    * 参数1是无参函数, 参数2是依赖数组
    * 返回参数1计算后的值, 依赖不变则返回值不变
    * 使用场景: 计算量极大, 配合memo, 自定义hook, 或者作为别人的依赖
* useCallback(缓存函数)
    * 参数1是要缓存的函数, 参数2是依赖数组
    * 返回一个函数, 用于保证渲染时, 依赖不变则函数不变, 不然每次都是一个新的
    * 使用场景: 配合memo, 自定义hook, 或者作为别人的依赖
* useDeferredValue(包装state)
    * 参数1是要延迟更新的变量, 参数2是可选的初始值
    * 使用该值的ui更新会变成非阻塞的, 配合memo降低卡顿
        * 后台渲染, 所以非阻塞
            * 后台渲染过程中更新值, 会放弃这次渲染来使用新值计算
            * 放弃的后台渲染不会触发effect
        * 新ui出现时间取决于react渲染速度, 也就是机器性能
    * 只是ui层面的节流, 不能减少网络请求次数
* useTransition(包装setState)
    * 没有参数, 返回数组, 第一项是状态是否更新完, 第二项是一个函数startTransition
    * startTransition参数是无参方法
        * 参数方法会立即执行
        * 参数必须直接调用setState
    * transition过程中被其他地方setState, 会跳过transition直接渲染state

### 不常用+自定义
* useId(唯一id)
    * 无参, 返回一个唯一的id
        * 重新渲染不影响id的值
        * 调用多次返回不同id
    * 组件内使用可以自己拼字符串, 相较于多次useId可读性更高一点
* 自定义hook
    * 遵守hook规则, 封装状态和逻辑
        * 和共通方法对比, 维护了状态用于更新ui
        * 和组件对比, 可以暴露修改状态的方法
* useDebugValue(debug)
    * 自定义hook时, 在tool里显示值
    * 参数1是要显示的值, 参数2是对参数1的格式化方法
* useSyncExternalStore(使用外部状态)
    * 自定义hook时, 取得外部状态
        * react内部的状态用state, 外部的状态使用该hook, 比如其他库, 浏览器api
    * 参数1是一个方法, 接收callback并在状态变更时调用, 参数2取得数据的方法, 参数3是服务端数据初始值
    * 返回值是当前状态
* useActionState(form+state)
    * 参数1是一个方法, 接收上次state和表单数据并返回最新state, 参数2是初始化state, 参数3是url
    * 返回值是数组, 第一项是state, 第二项是formAction