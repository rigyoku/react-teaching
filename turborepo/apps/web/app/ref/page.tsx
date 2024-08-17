'use client';

import { forwardRef, useImperativeHandle, useRef , useState} from "react";

let allNum = 1;

export default () => {
    return (
        <>
            {/* <Child1 />
            <Child2 /> */}
            <Child3/>
        </>
    )
}

const Child1 = () => {
    const [state, setState] = useState(1);
    console.log('render');
    let num = 1;
    const ref = useRef(1);
    const onClick = () => {
        // console.log(num);
        // console.log(ref.current);
        // console.log(allNum);
        // console.log(state);

        // num += 1;
        ref.current += 1;
        // allNum += 1;
        setState(state + 1);

        if ((window as any).test) {
            console.log(ref === (window as any).test);
        }
        (window as any).test = ref;

    }
    return (
        <>
            <button onClick={() => onClick()}>click1</button>
        </>
    );
}

const Child2 = () => {
    const [state, setState] = useState(1);
    console.log('render');
    let num = 1;
    const ref = useRef(1);
    const onClick = () => {
        console.log(num);
        console.log(ref.current);
        console.log(allNum);
        console.log(state);

        num += 1;
        ref.current += 1;
        allNum += 1;
        setState(state + 1);
    }
    return (
        <>
            <button onClick={() => onClick()}>click2</button>
        </>
    );
}

const Child3 = () => {
    const ref = useRef(null as any);
    const onClick = () => {
        // console.log(ref.current === document.getElementById('test'));
        console.log(ref.current);
    }
    return (
        <>
            {/* <button id="test" ref={(dom: any) => {
                ref.current = new Map();
                ref.current['name'] = 'liy';
            }} onClick={() => onClick()}>click2</button> */}

            <button id="test" onClick={() => onClick()}>click2</button>
            <Child4 ref={ref}></Child4>
        </>
    );
}

const Child4 = forwardRef((props: any, ref: any) => {

    useImperativeHandle(ref, () => {
        return {
            log: () => {
                console.log(777);
            }
        }
    }, []);

    return (
        <>
            {/* <div ref={ref}>111</div> */}
            <div>111</div>
        </>
    );
});