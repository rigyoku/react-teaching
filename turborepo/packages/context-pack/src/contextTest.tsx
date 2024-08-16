'use client';

import { useContext, useState, useReducer, memo } from 'react';
import { context1, context2, context3, reducer, constant } from './context';

export default () => {
    // const [state, setState] = useState(111);
    // const [state, dispath] = useReducer(reducer, 0);
    // console.log('top render');
    // return <Child/>;
    // return <>
    //     {/* <button onClick={() => setState(888)}>click</button> */}
    //     <context3.Provider value={dispath}>
    //         <context2.Provider value='123'>
    //             <context1.Provider value={state}>
    //                 <Child />
    //             </context1.Provider>
    //         </context2.Provider>
    //     </context3.Provider>
        
    // </>

    // return <>
    //     <Child2>
    //         <>
    //             <button onClick={() => dispath('1')}>click</button>
    //             {state}
    //         </>
    //     </Child2>
    // </>

    return <>
        <MyProvider>
            <Child1/>
        </MyProvider>
    </>;
}

const Child = memo(() => {
    console.log('Child render');
    // const value = useContext(context1);
    // const value = constant;
    return <>
        {/* <context1.Provider value={222}> */}
        <Child1 />
        {/* </context1.Provider> */}
    </>;
})

const Child1 = () => {
    console.log('Child1 render');
    const value = useContext(context1);
    const value2 = useContext(context2);
    const dispatch = useContext(context3);
    // const value = constant;
    return <>
        {value}
        <br />
        {value2}
        <br />
        <button onClick={() => dispatch('1')}>click</button>
    </>;
}

const Child2 = ({ children }: { children: React.ReactNode }) => {
    return <>
        {children}
    </>;
}

const MyProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispath] = useReducer(reducer, 0);
    console.log('top render');
    return <>
        <context3.Provider value={dispath}>
            <context2.Provider value='123'>
                <context1.Provider value={state}>
                    {children}
                </context1.Provider>
            </context2.Provider>
        </context3.Provider>   
    </>;
}