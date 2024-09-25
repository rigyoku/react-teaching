import { auth } from "@view/next-auth";
import { NextRequest, NextResponse } from "next/server";
import { PATH } from "./constants/path";
import { cookies } from "next/headers";
import { CONSTANT } from "./constants/const";
import { NextURL } from "next/dist/server/web/next-url";

const redirectToApp = (url: NextURL) => {
    url.pathname = PATH.APPLICATION;
    return NextResponse.redirect(url);
}

const redirectToLogin = (url: NextURL) => {
    url.pathname = PATH.LOGIN;
    return NextResponse.redirect(url);
}

export const middleware = async (request: NextRequest) => {
    const url = request.nextUrl.clone();
    const { pathname } = url;
    // 路径过滤
    if (pathname.startsWith('/_next/static')
        || pathname.endsWith('.png')
        || pathname.endsWith('.svg')
        || pathname.endsWith('.ico')
        || pathname.startsWith('/__nextjs')
        || pathname.startsWith('/api')
    ) {
        return;
    }

    // 是否包含密码登陆的cookie
    const passwordLoggedIn = cookies().get(CONSTANT.ACCOUNT.ACCOUNT_KEY)?.value !== undefined;
    // 是否包含github的session
    const githubLoggedIn = (await auth())?.user !== undefined;

    // console.log(`pathname: ${pathname} passwordLoggedIn: ${passwordLoggedIn} githubLoggedIn: ${githubLoggedIn}`);

    if (pathname === PATH.LOGIN) {
        if (passwordLoggedIn || githubLoggedIn) {
            // 有登录信息去访问登录页, 重定向到应用内
            return redirectToApp(url);
        }
    } else if (pathname === PATH.REGISTER) {
        if (passwordLoggedIn) {
            // 密码登陆过访问注册页, 重定向到应用内
            return redirectToApp(url);
        }
    } else if (!passwordLoggedIn && !githubLoggedIn) {
        // 访问其他页面且未登陆, 重定向到登陆页
        return redirectToLogin(url);
    }

};