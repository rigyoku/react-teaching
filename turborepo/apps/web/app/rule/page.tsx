'use client';

import { memo, useEffect, useState } from "react";

let name = '';

export default () => {
    const [state, setState] = useState(1);
    // useEffect(() => {
    //     setState(2);
    // }, []);
    if (state == 1) {
        setState(2);
    }
    // return <Child>
    //     <Child2 name="parent"/>
    // </Child>
    // return <Child3 type=""/>
    // return <Child4 name="111"></Child4>
    return <>
        {/* <Child5 local="111"></Child5> */}
        <Child5 local="222"></Child5>
    </>
}

const Child = ({ children }: { children: JSX.Element }) => {
    const [state, setState] = useState(1);
    // useEffect(() => {
    //     setState(state + 1)
    // }, [state])
    useEffect(() => {
        setState(state => state + 1)
    }, [])
    return <>
        {state}
        <button onClick={() => setState(state*-1)}>click</button>
        {children}
        <Child2 name="child"></Child2>
    </>
}

const Child2 = memo(({ name }: { name: string }) => {
    console.log(`child2 ${name}`);
    return <div>1111</div>
});

const Child3 = ({ type }: { type: string }) => {
    // useEffect(() => {
    //     document.getElementById('div')!.style.backgroundColor = type == 'red' ? 'red' : 'green';
    // }, []);
    return <div id="div" style={{ backgroundColor : type == 'red' ? 'red' : 'green' }}>1234</div>
}

const Child4 = ({ name }: { name: string }) => {
    console.log(`child4 ${name}`);
    return <div>1111</div>
};

const Child5 = ({ local }: { local: string }) => {
    name = name || local;
    return <div>{ name }</div>
};