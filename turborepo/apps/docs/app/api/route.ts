import { NextRequest, NextResponse } from "next/server";

let bool = false;

export const GET = async (req: NextRequest) => {
    const { searchParams } = req.nextUrl;
    const name = searchParams.get('name');
    const time = searchParams.get('time');
    console.log(`get /api . params.name: ${name}`);
    if (time) {
        await new Promise((res) => setTimeout(() => res(null), parseInt(time) * 1000));
        bool = !bool;
        return NextResponse.json(parseInt(time) * (bool ? 1 : -1));
    }
    return NextResponse.json(name);
}