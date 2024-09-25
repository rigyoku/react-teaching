'use client';
import { useCallback, useDeferredValue, useMemo, useState } from "react";

export const useInput = ({ type = 'text', name, passwordHint, defaultValue = '', notNull, modifyEnabled = true, }:
    Readonly<{ type?: InputType, name: string, passwordHint?: string, defaultValue?: string, notNull?: boolean, modifyEnabled?: boolean }>
) => {
    const [text, setText] = useState(defaultValue);
    const nullCheckd = useMemo(() => {
        if (notNull && text === '') {
            return false;
        }
        return true;
    }, [text, notNull]);
    const passwordCheckd = useMemo(() => {
        if (passwordHint && text.length < 6) {
            return false;
        }
        return true;
    }, [text, passwordHint]);
    const checked = useMemo(() => nullCheckd && passwordCheckd, [nullCheckd, passwordCheckd]);
    const input = useMemo(() => <div className="mb-2">
        <label className={`w-20 inline-block ${!passwordCheckd ? 'text-text.error font-bold' : ''}`} htmlFor={name}>{name}</label>
        <input className={`ml-2`} id={name} name={name} type={type} onChange={e => modifyEnabled && setText(e.target.value)} value={text} placeholder={passwordHint} />
    </div>, [type, name, text]);
    const reset = useCallback(() => setText(defaultValue), [defaultValue, setText]);
    const deferText = useDeferredValue(text);
    return {
        text,
        input,
        checked,
        reset,
        deferText,
    };
}