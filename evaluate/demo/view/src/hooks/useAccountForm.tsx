import { CONSTANT } from "@view/constants/const";
import { useActionState, useMemo } from "react";
import { useInput } from "./useInput";
import { Timer } from "@view/components/timer";

export const useAccoutForm = (
    {
        action,
        buttonText,
        successCallback,
        passwordHint,
        defaultUsername,
        usernameModifyEnabled = true,
    }: Readonly<{
        action: (formdata: FormData) => Promise<AccountResponse>,
        buttonText: string,
        successCallback: () => void,
        passwordHint?: string,
        defaultUsername?: string,
        usernameModifyEnabled?: boolean,
    }>
) => {
    
    const { input: username, checked: usernameChecked } = useInput({ name: CONSTANT.ACCOUNT.USERNAME, defaultValue: defaultUsername, notNull: true, modifyEnabled: usernameModifyEnabled });
    const { input: password, checked: passwordChecked } = useInput({ name: CONSTANT.ACCOUNT.PASSWORD, type: CONSTANT.ACCOUNT.PASSWORD, passwordHint, notNull: true, });
    const [accoutResponse, dispatch, isPending] = useActionState(async (_: AccountResponse, payload: FormData) => action(payload), {
        code: -1,
    });
    const accountForm = useMemo(() => {
        const { code, msg } = accoutResponse;
        if (isPending) {
            return <div>
                {CONSTANT.GLOBAL.LOADING}
            </div>;
        } else if (code === 0) {
            return <div className="mb-2">
                <Timer waitTime={CONSTANT.ACCOUNT.REDIRECT_WAIT} text={msg || ''} callback={successCallback}></Timer>
            </div>;
        } else {
            return <>
                {code === 1 ? <div className="text-text.error font-bold mb-2">{msg}</div> : ''}
                {username}
                {password}
                <button className={`bg-bg.primaryBtn w-32 view-border disabled:opacity-50`} disabled={!usernameChecked || !passwordChecked} formAction={dispatch}>{buttonText}</button>
            </>;
        }
    }, [accoutResponse, dispatch, isPending, username, password, buttonText, successCallback]);

    return { accountForm, isPending };
}