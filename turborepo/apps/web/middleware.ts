import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
    // const url = request.nextUrl.clone();
    // console.log(`Url: ${url}`);
    // // eval('console.log(123)')
    // // if (request.nextUrl.pathname.includes('aaa')) {
    // //     console.log('aaa~~~');

    // //     // return NextResponse.json('123')
    // //     url.pathname = '/effect';
    // //     return NextResponse.redirect(url)
    // //     // redirect(url.toString());
    // // }
    // // return NextResponse.next({
    // //     headers: {
    // //         'name': 'liy'
    // //     }
    // // });
    // if (request.headers.get('accept-language')?.startsWith('zh-CN')) {
    //     if (!url.pathname.startsWith('/cn')) {
    //         url.pathname = `/cn${url.pathname}`;
    //         return NextResponse.redirect(url)
    //     }
    // } else {
    //     if (!url.pathname.startsWith('/en')) {
    //         url.pathname = `/en${url.pathname}`;
    //         return NextResponse.redirect(url)
    //     }
    // }
};

export const config = {
    matcher: '/:path*'
    // matcher: ['/api/:path*', '/bbb/:path*',]
    // matcher: [
    //     {
    //         source: '/:path*',
    //         has: [
    //             {
    //                 type: 'cookie',
    //                 key: 'name',
    //                 value: '123'
    //             }
    //         ]
    //     }
    // ]
    // matcher: ['/(b*)']
};