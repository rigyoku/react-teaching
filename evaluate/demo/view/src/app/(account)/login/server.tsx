'use server';

import { signIn } from "@view/next-auth";
import { prisma } from "@view/../prisma/prisma";
import { CONSTANT } from "@view/constants/const";
import { updateCookieExpires } from "../server";
import { PATH } from "@view/constants/path";
import 'server-only';

export const githubLoginAction = async () => {
    'use server';
    await signIn('github', {redirectTo: PATH.API.CHECK_USER});
}

export const passwordLoginAction = async (formdata: FormData): Promise<AccountResponse> => {
    'use server';
    await new Promise(res => setTimeout(() => res(null), 2000));
    const username = formdata.get(CONSTANT.ACCOUNT.USERNAME)?.toString();
    const password = formdata.get(CONSTANT.ACCOUNT.PASSWORD)?.toString();
    try {
        const user = await prisma.user.findFirst({
            where: {
                username,
                password,
            }
        });
        if (user) {
            const { id, username } = user;
            updateCookieExpires({
                id, username,
            });
            return {
                code: 0,
                msg: CONSTANT.ACCOUNT.LOGIN.PASSWORD_LOGIN_SUCCESS_MSG,
            };
        } else {
            return {
                code: 1,
                msg: CONSTANT.ACCOUNT.LOGIN.PASSWORD_LOGIN_FAIL_MSG,
            };
        }
    } catch (error) {
        return {
            code: 1,
            msg: CONSTANT.ACCOUNT.LOGIN.PASSWORD_LOGIN_ERROR_MSG,
        };
    }
    
}