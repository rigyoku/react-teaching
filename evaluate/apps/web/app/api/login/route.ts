import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const url = request.nextUrl.clone();
    if (formData.get('pw') === '123') {
        url.pathname = `/af/demo`;
        return NextResponse.redirect(url);
    } else {
        url.pathname = `/af/123`;
        redirect(url.toString());
    }
}