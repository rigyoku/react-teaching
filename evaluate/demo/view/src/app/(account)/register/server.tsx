'use server';

import { prisma } from "@view/../prisma/prisma";
import { CONSTANT } from "@view/constants/const";
import { PATH } from "@view/constants/path";
import { redirect } from "next/dist/client/components/navigation";
import { cachedAuth } from "../server";
import 'server-only';
import { revalidateTag } from "next/cache";

export const checkRegistered = async () => {
    // cookie的校验在中间件
    // github登陆过了, 判断是否注册过了, 注册过了重定向到app
    const { name } = (await cachedAuth())?.user ?? {};
    if (name) {
        const user = await prisma.user.findFirst({
            where: {
                username: name,
            }
        });
        if (user?.password) {
            redirect(PATH.APPLICATION);
        }
    }
}

export const registerAction = async (formdata: FormData): Promise<AccountResponse> => {
    'use server';
    await new Promise(res => setTimeout(() => res(null), 2000));
    const username = formdata.get(CONSTANT.ACCOUNT.USERNAME)?.toString();
    const password = formdata.get(CONSTANT.ACCOUNT.PASSWORD)?.toString();
    if (!username || !password) {
        return {
            code: 1,
            msg: CONSTANT.ACCOUNT.REGISTER.USER_EXISTS_MSG
        };
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                username,
            }
        });
        if (user) {
            if (user.password) {
                // 用户名和密码都存在
                return {
                    code: 1,
                    msg: CONSTANT.ACCOUNT.REGISTER.USER_EXISTS_MSG
                };
            } else {
                // 用户名存在, 但是密码为空, 更新密码
                const { id } = user;
                await prisma.user.update({
                    where: {
                        id,
                    },
                    data: {
                        ...user,
                        password,
                    }
                });
            }
        } else {
            // 用户不存在
            const { id } = await prisma.user.create({
                data: {
                    username,
                    password,
                },
            });
            await prisma.user_setting.create({
                data: {
                    user_id: id,
                    theme: '',
                },
            });
            revalidateTag(CONSTANT.APPLICATION.CLIENT.CHILD.TAG);
            return {
                code: 0,
                msg: CONSTANT.ACCOUNT.REGISTER.REGISTER_SUCCESS_MSG,
            };
        }
    } catch (error) {
        return {
            code: 1,
            msg: CONSTANT.ACCOUNT.REGISTER.REGISTER_ERROR_MSG
        };
    }
    redirect(PATH.APPLICATION);
}