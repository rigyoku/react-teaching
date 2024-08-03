import { NextResponse } from "next/server"

export const GET = (req: Request) => {
    const {searchParams} = new URL(req.url);
    return NextResponse.json(`hello ${searchParams.get('name')}`);
}

export const POST = async (req: Request) => {
    const res = await req.json();
    return NextResponse.json(`hello ${JSON.stringify(res)}`);
}