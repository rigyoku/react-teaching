import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
    const { searchParams } = request.nextUrl;
    const name = searchParams.get('name');
    const id = searchParams.get('id');
    if (name) {
        if (name == '3') {
            revalidatePath(`/cache/next/patch-fetch/${id}/03`);
        } else if (name == '4') {
            revalidatePath('/cache/next/patch-fetch');
        } else {
            revalidateTag(name);
        }
    }
    return NextResponse.json('ok');
}