import { NextRequest, NextResponse } from "next/server";
import { CONSTANT } from "./app/constant/constant";

const { cn, cnLanguage, en, enLanguage } = CONSTANT;

const notLocal = (pathname: string) => {
    return pathname.startsWith('/api') || pathname.startsWith(`/_next`) || pathname.endsWith('.svg');
}

const needRedirectLocal = (request: NextRequest, language: string, local: string) => {
    const { headers, nextUrl } = request;
    const { pathname } = nextUrl;
    return headers.get('accept-language')?.startsWith(language) && !pathname.startsWith(`/${local}`);
}

export const middleware = (request: NextRequest) => {
    const url = request.nextUrl.clone();
    const { pathname } = url;
    if (notLocal(pathname)) {

    } else if (needRedirectLocal(request, cnLanguage, cn)) {
        url.pathname = `/${cn}${pathname}`
        return NextResponse.redirect(url);
    } else if (needRedirectLocal(request, enLanguage, en)) {
        url.pathname = `/${en}${pathname}`
        return NextResponse.redirect(url);
    }
}