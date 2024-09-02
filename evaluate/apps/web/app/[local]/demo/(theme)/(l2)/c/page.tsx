'use client';

import Link from "next/link";
import { Dispatch, forwardRef, memo, SetStateAction, useCallback, useImperativeHandle, useOptimistic, useRef, useState } from "react";

type InputFocus = {
    inputFocus: () => void,
}

export default () => {
    const [state, setState] = useState([1, 2]);
    const cb = () => console.log(123);
    const cbProps = useCallback(cb, []);
    const ref = useRef(null);
    return <div style={{ width: '40vw', height: '40vh'}}>
        {state.join(' , ')}
        <FormC ref={ref} cb={cbProps}/>
        <br />
        <ButtonC ref={ref} append={setState}/>
    </div>
}

const FormC = memo(
    forwardRef((props: {
        cb: () => void
    }, ref) => {
        console.log('FormC render');
        const inputRef = useRef(null as unknown as HTMLInputElement);
        const [id, setId] = useState('');
        const [msg, setMsg] = useState('');
        const [optMsg, setOptMsg] = useOptimistic(msg, (_state, action: string) => action);
        const action = async (_formData: FormData) => {
            setOptMsg('提交完了');
            await fetch('/af/api/opt');
        }
        useImperativeHandle(ref, () => {
            return {
                inputFocus() {
                    inputRef.current?.focus();
                }
            };
        });
        if (id === '999') {
            throw new Error(id);
        }
        return <form action={action}>
            <div>{optMsg}</div>
            <input ref={inputRef} type="text" value={id} onChange={(e) => setId(e.target.value)} />
            <br />
            <Link href={`/demo/c/${id}`}> to c/id</Link>
            <br />
            <button type="submit">opt</button>
            <br />
            <button onClick={() => props.cb()}>callback</button>
        </form>
    })
)

const ButtonC = forwardRef((props: {
    append: Dispatch<SetStateAction<number[]>>
}, ref: any) => <div>
        <button onClick={() => {
            (ref.current as unknown as InputFocus).inputFocus();
        }}>btn1</button>
        <br />
        <button onClick={() => props.append(state => [...state, parseFloat(Math.random().toFixed(2))])}>btn2</button>
</div>)