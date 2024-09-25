import { PATH } from "@view/constants/path";
import { auth, signOut } from "@view/next-auth";
import { prisma } from "@view/../prisma/prisma";
import { CONSTANT } from "@view/constants/const";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export const GET = async () => {
    const { name } = (await auth())?.user ?? {};
    if (name) {
        let user;
        try {
            // github登陆后, 检查是否注册在系统
            user = await prisma.user.findFirst({
                where: {
                    username: name,
                }
            });
        } catch (error) {
            // console.log(error);
            return await signOut({ redirectTo: encodeURI(`${PATH.LOGIN}?${CONSTANT.ACCOUNT.LOGIN.ERROR_MSG}=${CONSTANT.ACCOUNT.LOGIN.GITHUB_LOGIN_ERROR_MSG}`) });
        }
        if (user?.password) {
            // 注册了重定向到app内
            return redirect(PATH.APPLICATION);
        } else {
            // 没注册先注册然后重定向到注册页
            try {
                const { id } = await prisma.user.create({
                    data: {
                        username: name,
                    },
                });
                await prisma.user_setting.create({
                    data: {
                        user_id: id,
                        theme: '',
                    },
                });
                revalidateTag(CONSTANT.APPLICATION.CLIENT.CHILD.TAG);
            } catch (error) {
                return redirect(encodeURI(`${PATH.LOGIN}?${CONSTANT.ACCOUNT.LOGIN.ERROR_MSG}=${CONSTANT.ACCOUNT.LOGIN.GITHUB_LOGIN_ERROR_MSG}`));
            }
            return redirect(PATH.REGISTER);
        }
    } else {
        return redirect(encodeURI(`${PATH.LOGIN}?${CONSTANT.ACCOUNT.LOGIN.ERROR_MSG}=${CONSTANT.ACCOUNT.LOGIN.GITHUB_LOGIN_ERROR_MSG}`));
    }
}