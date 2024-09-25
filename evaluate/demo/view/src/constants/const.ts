export const CONSTANT = {
    GLOBAL: {
        LOADING: 'Loading...',
        TIMER_REPLACE: '**',
        HOST: 'http://localhost:8080',
    },
    ACCOUNT: {
        USERNAME: 'username',
        PASSWORD: 'password',
        REGISTER_USER: '注册用户',
        ACCOUNT_KEY: 'view_token',
        REDIRECT_WAIT: 3,
        LOGIN: {
            BUTTON_LIST: ['密码登录', '三方登录'],
            PASSWORD_LOGIN_SUCCESS_MSG: '登录成功, **秒后自动跳转...',
            PASSWORD_LOGIN_FAIL_MSG: '登录失败, 请检查用户名密码',
            PASSWORD_LOGIN_ERROR_MSG: '登录失败, 请联系管理员',
            LOGIN: 'Login',
            ERROR_MSG: 'error_msg',
            GITHUB_LOGIN_ERROR_MSG: 'Github登录失败, 请联系管理员',
        },
        REGISTER: {
            PASSWORD_HINT: '密码不能小于6位',
            REGISTER: '注册',
            USER_EXISTS_MSG: '用户已经存在',
            REGISTER_SUCCESS_MSG: '注册成功, **秒后自动跳转到登录页...',
            REGISTER_ERROR_MSG: '注册失败, 请联系管理员',
            DEFAULT_THEME: 'rgb(134 239 172)',
            SKIP: '跳过注册',
        },
    },
    APPLICATION: {
        LOGOUT: 'Logout',
        CONFIRM_LOGOUT: '是否确认登出?',
        CONFIRM: '确认',
        CONFIRM_CANCEL: '取消',
        CONFIRM_CLOSE: '关闭',
        CONFIRM_ADD: '添加',
        LIST: {
            MENU: 'List',
            ITEMS_TAG: 'cachedUserSetting',
            ADD_ITEM: '添加项目',
        },
        SETTING: {
            MENU: 'Setting',
            UPDATED_THEME: '主题更新成功',
        },
        CLIENT: {
            MENU: 'Client',
            SLOW_MSG: '请耐心等待...',
            CHILD: {
                NAME: 'Child',
                BACK: 'Back And Modify Cache',
                TO_USER: 'To User',
                F5: 'Please F5',
                TAG: 'users'
            }
        }
    }
} as const;