import { NextResponse } from "next/server";

export const GET = async () => {
    await new Promise((res: (value: unknown) => void) => setTimeout(() => res(''), 3000));
    return NextResponse.json('ng', {
        status: 500,
    })
}