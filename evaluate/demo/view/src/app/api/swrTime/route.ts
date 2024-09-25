import { NextResponse } from "next/server";

export const GET = async () => {
    await new Promise((res) => setTimeout(() => res(null), 5 * 1000));
    return NextResponse.json(new Date().toLocaleString());
};