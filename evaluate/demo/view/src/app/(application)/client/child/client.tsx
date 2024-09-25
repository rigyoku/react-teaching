'use client';

import { CONSTANT } from "@view/constants/const";
import { PATH } from "@view/constants/path";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";
import { useSWRConfig } from "swr";

export const PageContent = ({ children }: { children : ReactNode}) => {
    const route = useRouter();
    const {mutate} = useSWRConfig();
    const onBack = useCallback(() => {
        mutate(PATH.API.SWR_TIME, 'Modified');
        route.back();
    }, []);
    return <div>
        <button className="w-60 bg-bg.primaryBtn view-border text-center" onClick={onBack}>{CONSTANT.APPLICATION.CLIENT.CHILD.BACK}</button>
        <div className="mt-4">
            {children}
        </div>
    </div>
}