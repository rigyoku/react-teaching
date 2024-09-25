import { CONSTANT } from "@view/constants/const";
import { PATH } from "@view/constants/path";
import { ReactNode } from "react";
import { prisma } from "@view/../prisma/prisma";
import 'server-only';

export const SettingServerFetch = (time: string) => fetch(`${CONSTANT.GLOBAL.HOST}${PATH.API.WAIT}?time=${time}`)

export const SettingServer = async ({ children, time }: { children : ReactNode, time: string}) => {
    await SettingServerFetch(time);
    return <>{children}</>;
}

export const updateTheme = async ({
    theme,
    location,
    userId,
}: {
    theme: string,
    location: string,
    userId: number,
}) => {
    'use server';
    console.log(location);
    const { id } = await prisma.user_setting.findFirst({
        where: {
            user_id: userId,
        },
    }) ?? {};
    await prisma.user_setting.update({
        where: {
            id,
            user_id: userId,
        },
        data: {
            theme,
        }
    });
}