'use client';

import { useReducer } from 'react';

const reducer = (state: number, action: string): number => {
    if (action == 'a1') {
        return 1;
    }
    if (action == 'a2') {
        return 2;
    }
    return 0;
}

export default () => {
    console.log('render');
    const init = (num: number) => num+1
    const [state, dispatch] = useReducer(reducer, 0, init);
    
    const onClick = () => {
        dispatch('a2')
        console.log(state);
    }
    return (
        <>
            {state}
            <button onClick={() => onClick()}>click</button>
        </>
    )
}