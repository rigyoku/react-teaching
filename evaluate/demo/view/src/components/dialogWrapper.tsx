'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useState } from "react";
import { Dialog } from ".";
import { CONSTANT } from "@view/constants/const";

const defaultDialog: {
    dialog: Dialog,
    updateShowDialog: Dispatch<SetStateAction<Dialog>>,
    autoMissDialog: (dialog: Dialog, waitTime: number) => void,
} = {
    dialog: {
        show: false,
        node: '',
    },
    updateShowDialog: () => { },
    autoMissDialog: () => { },
};

const dialogContext = createContext(defaultDialog);

export const useDialog = () => useContext(dialogContext);

export const DialogWrapper = ({ children }: { children: ReactNode }) => {
    const [dialog, updateShowDialog] = useState(defaultDialog.dialog);
    const autoMissDialog = useCallback((dialog: Dialog, waitTime: number) => {
        updateShowDialog(dialog);
        setTimeout(() => {
            updateShowDialog(dialog => ({
                ...dialog,
                show: false,
            }));
        }, waitTime * 1000);
    }, [updateShowDialog]);

    const hideDialog = useCallback(() => {
        updateShowDialog(dialog => ({
            ...dialog,
            show: false,
        }));
    }, [updateShowDialog]);

    const { show, node, className, confirmCallback, confirmText, confirmEnabled = true, cancelText, cancelCallback, cancelHidden = false } = dialog;

    return <>
        <dialogContext.Provider value={{ dialog, updateShowDialog, autoMissDialog }}>
            <>
                <div className={`z-50 bg-bg.dialog.opacity absolute w-full h-full flex justify-center items-center ${show || 'hidden'}`}>
                    <div className={`bg-bg.card view-border opacity-100 text-center ${className ?? 'w-60 h-36'}`}>
                        {node}
                        <div>
                            {confirmCallback && <button className={`${confirmEnabled || 'disabled:opacity-50'} mr-12 bg-bg.primaryBtn view-border`} disabled={!confirmEnabled} onClick={async () => {
                                await confirmCallback?.();
                                hideDialog();
                            }}>{confirmText ?? CONSTANT.APPLICATION.CONFIRM}</button>}
                            {cancelHidden || <button className="bg-bg.normalBtn view-border" onClick={async () => {
                                await cancelCallback?.();
                                hideDialog();
                            }}>{cancelText ?? CONSTANT.APPLICATION.CONFIRM_CANCEL}</button>}
                        </div>
                    </div>
                </div>
                {children}
            </>
        </dialogContext.Provider>
        
    </>
};