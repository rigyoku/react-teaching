'use client';

import { memo, useCallback, useDeferredValue, useMemo, useState, useTransition } from "react";



export default () => {

    // const obj = {

    // };

    // const obj2 = useMemo(() => obj, [])
    

    // if ((window as any).test) {
    //     console.log((window as any).test === obj)
    // } else {
    //     (window as any).test = obj;
    // }

    // const [state, setState] = useState(1);

    // return <>
    //     {state}
    //     <button onClick={() => setState(-1 * state)}>click</button>
    //     <Child obj={obj2}/>
    // </>

    // const func = () => {

    // };

    // function func() {

    // };

    // const func2 = useCallback(func, [])


    // if ((window as any).test) {
    //     console.log((window as any).test === func)
    // } else {
    //     (window as any).test = func;
    // }

    // const [state, setState] = useState(1);

    // return <>
    //     {state}
    //     <button onClick={() => setState(-1 * state)}>click</button>
    //     <Child2 func={func2} />
    // </>

    // return <Child3></Child3>

    const [state, setState] = useState(1);

    const [isPending, startTransition] = useTransition();

    return <>
        {state}
        <input type="text" />
        <button onClick={() => setState(1)}>click 1</button>
        <button onClick={() => {
            console.log(1)
            setTimeout(() => {
                startTransition(() => {
                    console.log(2)
                    // setTimeout(() => {
                        setState(-1);
                    // }, 0);
                });
            }, 0);
            console.log(3)
        }}>click -1</button>
        {
            state == 1 ? <div>123</div> : <Child5></Child5>
        }
    </>
}

const Child = memo(({ obj }: { obj: Object }) => {
    console.log('render child');
    return <>child</>
});

const Child2 = memo(({ func }: { func: Function }) => {
    console.log('render child2');
    return <>child</>
});

const Child3 = () => {
    console.log('Child3');
    const [state, setState] = useState('');
    const value = useDeferredValue(state);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value)
    }

    return <>
        <input type="text" onChange={onChange} />
        {state}
        <br></br>
        <Child4 obj={value}></Child4>
        <br></br>
        {/* <button onClick={() => setState(-1 * state)}>click</button> */}
    </>
}

const Child4 = memo(({ obj }: { obj: any }) => {
    console.log('Child4');
    const list = new Array(3000 * 10000).fill(1).map(item => item * 2);
    return <>child4{ obj }</>
})

const Child5 = () => {
    return new Array(100).fill(1).map(_ => <Child6 key={Math.random()}></Child6>) 
}

const Child6 = () => {
    new Array(300 * 10000).fill(1).map(item => item * 2);
    return <div>Child6</div>
}