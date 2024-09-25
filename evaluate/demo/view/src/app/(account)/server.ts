import { CONSTANT } from "@view/constants/const";
import { auth } from "@view/next-auth";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { cache } from "react";
import 'server-only';

export const cachedAuth = cache(async () => await auth());

export const updateCookieExpires = ({ id, username, }: { id: number, username: string, }) => {
    const expiresIn = 10 * 60 * 1000;
    const value = sign({
        id,
        username,
    }, process.env.AUTH_SECRET ?? '', {
        expiresIn,
    });
    cookies().set({
        name: CONSTANT.ACCOUNT.ACCOUNT_KEY,
        value,
        httpOnly: true,
        expires: Date.now() + expiresIn,
    });
}