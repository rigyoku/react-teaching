'use client';

import { Dispatch, SetStateAction, useActionState, useDebugValue, useEffect, useId, useMemo, useState, useSyncExternalStore } from "react";

export default () => {

    // const id = useId();

    // console.log(id);

    // const [state, setState] = useState(1);

    // return (
    //     <>
    //         <button onClick={() => setState(state * -1)}>click</button>
    //     </>
    // )

    // const copyValue = useCopy();
    // return (
    //     <>
    //         1<br />
    //         2<br />
    //         3<br />
    //         4<br />
    //         5<br />
    //         {copyValue}
    //     </>
    // )

    // const [setState, jsx] = useDiv();
    // return (
    //     <>
    //         <button onClick={() => setState(-1)}>click</button>
    //         {jsx}
    //     </>
    // )
    
    // const language = useLanguage();
    // return (
    //     <>
    //         {language}
    //     </>
    // )

    return (
        <Child/>
    )

}

const useCopy = () => {
    const [state, setState] = useState('');

    useEffect(() => {
        const listener = async (e: any) => {
            const text = await navigator.clipboard.readText();
            console.log(text);
            setState(text);
        };
        document.body.addEventListener('copy', listener);
        return () => document.body.removeEventListener('copy', listener);
    }, []);

    return state;
}

const useDiv: () => [Dispatch<SetStateAction<number>>, JSX.Element] = () => {
    useDebugValue('1111', str => str.split('').join('---'));
    const [state, setState] = useState(1);
    const jsx = useMemo(() => (
        <>
            <div style={{backgroundColor: state == 1 ? 'red' : 'green'}}>
                DIV
            </div>
            <button onClick={() => setState(state * -1)}>click</button>
        </>
    ), [state]);
    return [setState, jsx];
}

const useLanguage = () => {
    const subscribe = (callback: () => void) => {
        window.addEventListener('languagechange', callback);
        return () => window.removeEventListener('languagechange', callback);
    }
    const getData = () => {
        return navigator.language;
    }
    const value = useSyncExternalStore(subscribe, getData);
    return useMemo(() => value, [value]);
}

const Child = () => {
    const [state, action] = useActionState((state: number, formData: FormData): number => {
        return state * -1;
    }, 1);

    return <form action={action}>
        {state}
        <button type="submit">click</button>
    </form>
}