'use client';

import React from 'react';
import { useEffect, useState, useLayoutEffect, useInsertionEffect, useRef } from 'react';


export default () => {
    const [state, setState] = useState(1);
    return (
        <>
            {/* {
                state == 1 ? <Child/> : null
            }
            <br />
            {state}
            <button id='button' onClick={() => setState(-1*state)}>click</button> */}

            <Child2/>
        </>
    );
}


const Child = () => {

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         console.log('setTimeout');
    //     }, 2000);
    //     return () => clearTimeout(timer);
    // }, []);

    useEffect(() => {
        const listener = () => console.log('listener');
        window.addEventListener('click', listener);
        return () => window.removeEventListener('click', listener);
    }, []);

    return (

        <>
            effect
        </>
    )

}

const Child2 = () => {
    const [state, setState] = useState(0);
    // useEffect(() => {
    //     if (state == 1) {
    //         setState(2);
    //     }
    // }, [state]);
    // useLayoutEffect(() => {
    //     if (state == 1) {
    //         setState(2);
    //     }
    // }, [state]);
    const ref = useRef(null);
    useEffect(() => {
        console.log(`useEffect ${ref.current}`);
    }, [state]);
    useLayoutEffect(() => {
        console.log(`useLayoutEffect ${ref.current}`);
    }, [state]);
    useInsertionEffect(() => {
        console.log(`useInsertionEffect ${ref.current}`);
        const style = document.createElement('style');
        style.innerHTML = 'button{background-color:red}';
        document.getElementsByTagName('head')[0]?.append(style);
    }, [state])
    return (
        <>
            <div ref={ref} style={{ backgroundColor: `${state == 1 ? 'red' : 'green'}`, width: '200px' }}>{state}</div>
            <button id='button' onClick={() => setState(state+1)}>click</button>
        </>
    );
}