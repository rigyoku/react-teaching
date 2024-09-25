'use server';

import { CONSTANT } from "@view/constants/const";
import { PATH } from "@view/constants/path";
import { signOut } from "@view/next-auth";
import { cookies } from "next/headers";
import { cache } from "react";
import { prisma } from "@view/../prisma/prisma";
import { cachedAuth } from "../(account)/server";
import { JwtPayload, verify } from "jsonwebtoken";
import { redirect } from "next/navigation";
import 'server-only';

export const logout = async () => {
    'use server';
    cookies().delete(CONSTANT.ACCOUNT.ACCOUNT_KEY);
    await signOut({ redirectTo: PATH.LOGIN });
}

export const cachedUserIdAndName = cache(async () => {
    console.log('cachedUserIdAndName');
    try {
        const token = verify(cookies().get(CONSTANT.ACCOUNT.ACCOUNT_KEY)?.value ?? '', process.env.AUTH_SECRET ?? '') as JwtPayload & {
            id: number,
            username: string,
        }
        const { id, username } = token ?? {};
        if (!!id && !!username) {
            return {
                id, username,
            };
        }
    } catch (error) {
        console.error('cachedUserIdAndName');
    }
    try {
        const session = await cachedAuth();
        let name = session?.user?.name;
        if (!!name) {
            const { id, username } = await cachedUser(name) ?? {};
            return {
                id,
                username,
            };
        }
    } catch (error) {
        console.error('cachedUserIdAndName');
    }
    redirect(PATH.LOGIN);
});

export const cachedUser = cache(async (username: string) => {
    try {
        console.log('cachedUser');
        return await prisma.user.findFirst({
            where: {
                username,
            }
        });
    } catch (error) {
        console.error('cachedUser');
        return null;
    }
});


export const cachedUsers = cache(async () => {
    try {
        console.log('cachedUsers');
        return await prisma.user.findMany();
    } catch (error) {
        console.error('cachedUsers');
        return null;
    }
});


export const cachedUserSetting = cache(async (user_id: number) => {
    try {
        console.log('cachedUserSetting');
        return await prisma.user_setting.findFirst({
            where: {
                user_id,
            }
        });
    } catch (error) {
        console.error('cachedUserSetting');
        return null;
    }
});


export const cachedUserItems = cache(async (user_id: number) => {
    try {
        console.log('cachedUserItems');
        return await prisma.user_items.findMany({
            where: {
                user_id,
            }
        });
    } catch (error) {
        console.error('cachedUserItems');
        return null;
    }
});


export const cachedUserItem = cache(async (id: number) => {
    try {
        console.log('cachedUserItem');
        return await prisma.user_items.findFirst({
            where: {
                id,
            }
        });
    } catch (error) {
        console.error('cachedUserItem');
        return null;
    }
});