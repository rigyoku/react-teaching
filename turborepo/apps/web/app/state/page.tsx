'use client';

import State from '@repo/state-pack/state';
import Reducer from '@repo/state-pack/reducer';
import { useOptimistic, useState } from 'react';
import {sc} from './action'

export default () => {
    const [state, setState] = useState(0);
    const [opt, addOpt] = useOptimistic(state, (state, value: number) => {
        return value;
    });

    const submit = async (fd: FormData) => {
        addOpt(111);
        await sc(fd);
        setState(999);
    }

    return (
        // <State></State>
        // <Reducer></Reducer>

        <>
            <p>{opt}</p>
            <p>{ state }</p>
            <form action={submit}>
                <button type="submit">submit</button>
            </form>
        </>
    )
}