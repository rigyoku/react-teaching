# 评估

## 需求描述

### 全局
* turbo初始化工程, 大版本限定 next14 / react18
* 主体代码放在的demo/view目录下
* 依赖只安装在demo/view下
* turbo下执行npm run dev会单独启动view工程(不能用#定义task,不能删其他的dev命令)
* view根目录下有view.log文件, 更改这个文件不会影响turbo的build缓存
* 配置别名@view为app上层路径
* 通过prisma连接mysql

### /login
* 未登录会重定向到该路由
* 包含左侧图片和右侧登陆表单
* 表单可以切换密码登陆或者三方登陆
* 右下角有link到/register进行注册
* 默认密码登陆, 输入用户名密码来进行db校验, 登陆成功则重定向到/application
* 三方登陆包含github登陆按钮, 用户未注册则重定向到/register, 登陆成功则重定向到/application

### /register
* 注册表单, 填写用户名, 密码进行注册
* 如果从github登陆重定向过来, 则用户名默认为github的用户名

### /application
* 顶部横幅提供退出登陆按钮

TODO...