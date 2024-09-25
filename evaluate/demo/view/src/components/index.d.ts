import { ReactNode } from "react";

declare type Dialog = {
    show: boolean,
    node: ReactNode,
    className?: string,
    confirmCallback?: () => (Promise<void> | void),
    confirmText?: string,
    confirmEnabled?: boolean,
    cancelHidden?: boolean,
    cancelText?: string,
    cancelCallback?: () => (Promise<void> | void),
}
