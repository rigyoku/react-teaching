'use client';

import { CONSTANT } from "@view/constants/const";
import { useDialog } from "../../components/dialogWrapper";

export const LogoutButton = ({ logout, className }: { logout: () => Promise<void>, className?: string }) => {
    const { updateShowDialog } = useDialog();
    return <button className={className} onClick={() => updateShowDialog({
        show: true,
        node: <div className="font-bold mb-5 mt-10">{CONSTANT.APPLICATION.CONFIRM_LOGOUT}</div>,
        confirmCallback: () => {
            updateShowDialog(dialog => ({
                ...dialog,
                show: false,
            }));
            logout();
        },
    })}>{CONSTANT.APPLICATION.LOGOUT}</button>;
}