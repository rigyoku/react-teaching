'use client';

import { githubLoginAction, passwordLoginAction } from "./server";
import { useSwitch } from "@view/hooks/useSwitch";
import { CONSTANT } from "@view/constants/const";
import Image from "next/image";
import { ReactNode, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PATH } from "@view/constants/path";
import Link from "next/link";
import { useAccoutForm } from "@view/hooks/useAccountForm";
import { useMousePop } from "@view/hooks/useMousePop";

export const LoginForm = ({ pop, githubError }: { pop: ReactNode, githubError?: string }) => {
    const route = useRouter();
    const successCallback = useCallback(() => {
        route.replace(PATH.APPLICATION);
    }, []);
    const { currentId, switchNode } = useSwitch(CONSTANT.ACCOUNT.LOGIN.BUTTON_LIST, githubError ? 1 : 0);
    const { accountForm, isPending } = useAccoutForm({
        action: passwordLoginAction,
        buttonText: CONSTANT.ACCOUNT.LOGIN.LOGIN,
        successCallback,
    });
    const githubContent = useMemo(() => <>
        {githubError && <div className="text-text.error font-bold mb-2">{githubError}</div>}
        <button className="view-border" formAction={githubLoginAction}>
            <Image className="mb-2" src={'/github.svg'} width={100} height={100} alt="github"></Image>
            <span className="text-text.primaryBtn">Github Login</span>
        </button>
    </>, [githubError, githubLoginAction]);
    const { node: githubNode } = useMousePop({
        pop,
        content: githubContent,
        wrapClass: 'w-[100px]',
    });

    return <div className={`w-[25vw] h-72 mr-10 bg-bg.card p-4 view-border`}>
        {switchNode}
        <form className="">
            {
                currentId === 0 ? accountForm : githubNode
            }
        </form>
        {
            isPending ||
            <Link className="float-right underline" href={PATH.REGISTER}>
                {CONSTANT.ACCOUNT.REGISTER_USER}
            </Link>
        }
        
    </div>;
}