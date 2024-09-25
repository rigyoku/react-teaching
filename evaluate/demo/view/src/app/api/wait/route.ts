import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const { searchParams } = req.nextUrl;
    const time = searchParams.get('time') ?? '0';
    await new Promise((res) => setTimeout(() => res(null), parseInt(time) * 1000));
    return NextResponse.json('ok');
}