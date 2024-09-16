import { auth } from "@/nextauth";
import { NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
    const session = await auth();
    console.log(JSON.stringify(session));
};

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};