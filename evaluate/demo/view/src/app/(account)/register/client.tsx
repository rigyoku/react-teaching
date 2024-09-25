'use client';

import { registerAction } from "./server";
import { CONSTANT } from "@view/constants/const";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { PATH } from "@view/constants/path";
import { useAccoutForm } from "@view/hooks/useAccountForm";
import Link from "next/link";

export const RegisterForm = ({ defaultUsername, skipText }: { defaultUsername: string | undefined | null, skipText?: string }) => {

    const route = useRouter();
    const successCallback = useCallback(() => {
        route.replace(PATH.LOGIN);
    }, []);
    const { accountForm, isPending } = useAccoutForm({
        action: registerAction,
        buttonText: CONSTANT.ACCOUNT.REGISTER.REGISTER,
        successCallback,
        passwordHint: CONSTANT.ACCOUNT.REGISTER.PASSWORD_HINT,
        defaultUsername: defaultUsername ?? '',
        usernameModifyEnabled: !defaultUsername,
    });

    return <div className={`w-[25vw] h-72 mr-10  bg-bg.card p-4 view-border`}>
        <form className="">
            {accountForm}
        </form>
        {
            isPending || (skipText &&
            <Link className="float-right underline" href={PATH.APPLICATION}>
                {skipText}
            </Link>)
        }
    </div>;
}