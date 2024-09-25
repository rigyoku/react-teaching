'use server';

import { ReactNode } from "react";
import { LogoutButton } from "./client";
import { cachedUserSetting, cachedUserIdAndName, logout } from "./server";
import Link from "next/link";
import { PATH } from "@view/constants/path";
import { CONSTANT } from "@view/constants/const";

export default async ({ children }: { children: ReactNode }) => {
    const { id, username } = await cachedUserIdAndName();
    const { theme } = await cachedUserSetting(id!) ?? {};
    const menu = [
        {
            path: PATH.LIST,
            value: CONSTANT.APPLICATION.LIST.MENU,
            prefetch: false,
        },
        {
            path: PATH.SETTING,
            value: CONSTANT.APPLICATION.SETTING.MENU,
            prefetch: true,
        },
        {
            path: PATH.CLIENT,
            value: CONSTANT.APPLICATION.CLIENT.MENU,
            prefetch: true,
        }
    ];
    return <div className="h-full">
        <div className={`${theme} h-20 flex items-center justify-end shadow-md shadow-bg.dialog drop-shadow-md`}>
            <div className="flex-auto text-center text-bg.primaryBtn font-bold">View Demo</div>
            <span className="mr-4">{username}</span>
            <LogoutButton className="mr-4 view-border w-20 bg-bg.primaryBtn" logout={logout} />
        </div>
        <div className="bg-bg.normalBtn h-1"/>
        <div className="flex h-full">
            <div className="w-40 h-full p-2 shadow-xl shadow-bg.dialog drop-shadow-lg">
                {
                    menu.map(({ path, value, prefetch }) => <Link href={path} key={path} prefetch={prefetch}>
                            <div className="bg-bg.primaryBtn view-border m-2 pl-2">{value}</div>
                        </Link>)
                }
            </div>
            <div className="w-1 bg-bg.normalBtn"></div>
            <div className="flex-auto h-full p-2">
                {children}
            </div>
        </div>
        
    </div>;
}