'use client';

import { useDialog } from "@view/components/dialogWrapper";
import { CONSTANT } from "@view/constants/const";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const Dialog = ({ children }: { children : ReactNode}) => {
    const { updateShowDialog } = useDialog();
    const route = useRouter();
    useEffect(() => {
        updateShowDialog({
            show: true,
            node: children,
            cancelText: CONSTANT.APPLICATION.CONFIRM_CLOSE,
            cancelCallback: route.back,
        });
    }, [updateShowDialog, children]);
    return null;
}