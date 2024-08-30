import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const { searchParams } = req.nextUrl;
    const name = searchParams.get('name');
    const time = searchParams.get('time');
    console.log(`get /api . params.name: ${name}`);
    if (time) {
        await new Promise((res) => setTimeout(() => res(null), parseInt(time) * 1000));
    }
    return NextResponse.json(name || time);
}