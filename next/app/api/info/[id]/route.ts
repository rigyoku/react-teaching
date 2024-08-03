import { NextResponse } from "next/server"

export const GET = (_: Request, {params}: {params: {id: string}}) => {
    return NextResponse.json(`hello ${params.id}`);
}