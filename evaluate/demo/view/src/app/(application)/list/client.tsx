'use client';
import { useDialog } from "@view/components/dialogWrapper";
import { CONSTANT } from "@view/constants/const";
import { useInput } from "@view/hooks/useInput";
import { useCallback, useEffect } from "react";

export const AddItem = ({ addItem, id }: {
    addItem: (param: {
        userId: number,
        name: string,
    }) => Promise<void>, id: number }) => {
    const { updateShowDialog } = useDialog();
    const { input, checked, text, reset } = useInput({ name: 'name', notNull: true, });
    const confirmCallback = useCallback(async () => {
        await addItem({
            userId: id,
            name: text,
        });
        reset();
    }, [addItem, id, text, reset]);
    const openDialog = useCallback(() => {
        updateShowDialog({
            show: true,
            node: <div className="mb-4 mt-8">{input}</div>,
            confirmCallback,
            confirmEnabled: checked,
            confirmText: CONSTANT.APPLICATION.CONFIRM_ADD,
            cancelCallback: reset,
            className: 'w-72 h-36'
        });
    }, [input, confirmCallback, checked, updateShowDialog]);
    useEffect(() => {
        updateShowDialog(dialog => ({
            ...dialog,
            node: <div className="mb-4 mt-8">{input}</div>,
            confirmCallback,
            confirmEnabled: checked,
        }));
    }, [input, confirmCallback, checked]);
    return <button className="float-right mr-3 pl-1 pr-1 bg-bg.primaryBtn view-border" onClick={openDialog}>{ CONSTANT.APPLICATION.LIST.ADD_ITEM }</button>
}