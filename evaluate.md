# 评估

## 评估项目
* 需求实现
* 代码结构
* hook/共通组件使用
* 缓存/react性能/服务端组件
* 借鉴程度
* 提交时间

## 需求描述

### 工程
* turbo初始化工程(演示中的版本是 next: 15.0.0-canary.161 / react: 19.0.0-rc-e740d4b1-20240919)
* 主体代码放在的demo/view目录下(自己创建), 使用app router
* 依赖只安装在demo/view下
* turbo下执行npm run dev会单独启动view工程(不能用#定义task,不能删其他的dev命令), 使用8080端口
* turbo下执行npm run start会先执行所有工程build, 然后启动view
* view根目录下有view.log文件, 更改这个文件不会影响turbo的build缓存
* view工程配置别名@view, 指向app的上层路径
* 使用到的env放入对应环境的文件并提交(prisma的url直接写在schema.prisma即可, 使用提供的ddl建表)
* 修改title为view-demo, icon为github的icon
* server相关方法防止客户端文件使用

### /register
* 有hint密码不得小于6位
* 小于6位label会变红且无法注册
* 用户名不能为空
* 注册失败显示msg
* 从github登录重定向过来时
    * 用户名为github用户名且无法更改
    * 额外显示跳过按钮, 用于重定向到/
    * 注册成功重定向到/
* 其他情况, 注册成功提示msg在3s后重定向到/login
* 包含密码登陆的cookie重定的到/
* 如果github登陆的用户已经注册过了, 重定的到/

### /login
* 登录了访问会重定向到/
* 包含左侧图片和右侧登录表单
* 可以切换密码登录或者三方登录
* 右下角有link到/register进行注册
* 默认密码登录
    * 输入用户名密码来进行db校验
        * 输入框必须都非空才能login
        * 有form的loading效果
        * 登录成功提示msg在3s后重定向到/
        * 登录失败显示msg
* 三方登录
    * 包含github登录按钮, 通过next-auth集成github登录
        * 登录成功时, 如果已经注册过(用户名相同且密码非空), 重定向到/
        * 未注册(无同名或者密码为空)会使用github的name来注册空密码的用户, 并重定向到/register
        * 登录失败重定向到/login并显示msg
    * 悬浮会出一个pop, 内容在服务端渲染, 显示github的authkey

### /
* 未登录访问会重定向到/login(判断是否包含对应cookie, 或者github的session)
* 顶部横幅
    * 显示用户名和退出登录按钮
        * 退出会有dialog确认, dialog在body下一层
    * 横幅颜色来自setting表, 为空给个默认值
* 左侧menu分别重定向到下列路径, 右侧图片
    * list的link禁用预加载

### /list
* 显示对应user的items表数据
* 数据缓存为10分钟
* 新增按钮用于弹出dialog, 可以输入内容添加一条数据
* 有非空判断, 影响按钮活性
* 添加后列表页能显示出新增内容
* 再次点击添加, 输入框为空
* 点击列表项目, 重定向到/list/\[userId]/item/\[itemId]
    * dialog展示, 内容是userId/itemId/itemName
    * 点击关闭返回列表页
    * f5会在右侧区域渲染内容, 而非dialog

### /setting
* 第一层组件调用api等5s, 下层S2组件调用api等3s, 做预请求加速展示
* 最下层有输入框和按钮用于修改setting.theme
* 有非空判断, 影响按钮活性
* 提交时, 额外提交浏览器的地理位置
* 提交成功时, 清空输入框, dialog提示并自动消失, 更新横幅颜色

### /client
* 上方一个输入框, 会根据内容生成一万个空组件, 每个组件循环十万次后打印一下输入框内容, 要求输入内容不会卡顿
* 下方会通过swr查询api(api会延迟5s)返回当前时间, 20s间隔自动更新
* 客户端超过3s没收到会提示一下网络不好, 自动关闭
* 切浏览器的窗口不会更新
* 点击按钮重定向到 /client/child

### /client/child
* 和上文同样的输入框, 内容清空
* 左侧按钮, 右侧文字
* 点击按钮更新缓存的时间(返回client时先展示该时间)
* 点击按钮跳转到/client/child/\[userId]/\[second]页(最后一个是当前时间秒数)
    * 非db中的user会打开自定义的404页
    * 只在注册用户成功后更新缓存
    * 左侧显示用户名和id, 右侧文字不变
    * F5后两侧都显示用户名和id


## DDL
```sql
create database demo_view;

CREATE TABLE `demo_view`.`user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `demo_view`.`user_setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `theme` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `demo_view`.`user_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```