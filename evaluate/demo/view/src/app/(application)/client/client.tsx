'use client';

import { useDialog } from "@view/components/dialogWrapper";
import { CONSTANT } from "@view/constants/const";
import { PATH } from "@view/constants/path";
import { useInput } from "@view/hooks/useInput";
import { useSWRTime } from "@view/hooks/useSWRTime";
import Link from "next/link";
import { memo, ReactNode } from "react";
import { SWRConfig } from "swr";

const PerformanceChild = memo(({ text }: { text: string }) => {
    for (let i = 0; i < 100000; i++) {
    
    }
    console.log(text);
    return null;
});

export const PerformanceInput = () => {
    const { input, deferText } = useInput({
        name: 'LazyInput',
    });
    const items = new Array(10000).fill('');
    return <div>
        {input}
        {items.map((_, index) => <PerformanceChild key={index} text={ deferText } />)}
    </div>
}

export const SWRWrapper = ({ children }: { children: ReactNode }) => {
    const { autoMissDialog } = useDialog();
    return <SWRConfig value={{
        revalidateOnFocus: false,
        refreshInterval: 20 * 1000,
        loadingTimeout: 3 * 1000,
        onLoadingSlow() {
            autoMissDialog({
                show: true,
                node: CONSTANT.APPLICATION.CLIENT.SLOW_MSG,
                cancelHidden: true,
                className: 'w-60 h-10',
            }, 1.5);
        },
    }}>
        {children}
    </SWRConfig>;
};

export const PageContent = () => {
    const node = useSWRTime();
    return <>
        {node}
        <Link href={PATH.CLIENT_CHILD}>
            <div className="w-20 bg-bg.primaryBtn view-border text-center">{CONSTANT.APPLICATION.CLIENT.CHILD.NAME}</div>
        </Link>
    </>
}