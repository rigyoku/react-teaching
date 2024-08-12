'use client';

import { useState } from 'react';
import { flushSync } from 'react-dom';

export default () => {
    console.log('parent render');
    const init = () => {
        console.log('init');
        return 0;
    }
    const [state, setState] = useState(0);
    // const [state, setState] = useState(init);

    // const [state, setState] = useState({
    //     name: 'liy'
    // });

    // if (state == 0) {
    //     setState(1)
    // }


    const onClick = () => {
        // setState(state => {
        //     console.log(`in setState : ${state}`);
        //     return 1;
        // });
        // flushSync(() => setState(state => {
        //     console.log(`in setState : ${state}`);
        //     return 1;
        // }));
        // console.log(`after set : ${state}`);
        // flushSync(() => setState(state => {
        //     console.log(`in setState2 : ${state}`);
        //     return 1;
        // }));

        setState(state => {
            console.log(`in setState : ${state}`);
            // state.name = 'aa';
            return state;
        });
        console.log(`after set2 : ${state}`);
    }
    return (
        <>
            {/* {state} */}
            {/* <button onClick={() => onClick()}>click</button> */}
            {/* <Child num={state} cb={setState}></Child> */}
            {/* <Child2></Child2> */}
            <Child3></Child3>
        </>
    )
}

const Child = ({ num, cb }: { num: number, cb: Function }) => {
    const [state, setState] = useState(num);
    cb(1);
    return (
        <>
            <div>{`state: ${state}`}</div>
            <div>{`props: ${num}`}</div>
        </>
    )
}

const Child2 = () => {
    const [state, setState] = useState([
        {
            name: 'father1',
            childs: [
                {
                    name: 'child1-1',
                    age: 1,
                },
                {
                    name: 'child1-2',
                    age: 2,
                }
            ]
        }, {
            name: 'father2',
            childs: [
                {
                    name: 'child2-1',
                    age: 3,
                },
                {
                    name: 'child2-2',
                    age: 4,
                }
            ]
        }
    ]);

    const changeAge = (fIndex: number, cIndex: number) => {
        setState(state => {
            const targetFather = [...state].splice(fIndex, 1);
            targetFather[0]?.childs.splice(cIndex, 1, {
                name: state[fIndex]?.childs[cIndex]?.name || '',
                age: 99
            });
            const result = [...state];
            result.splice(fIndex, 1, targetFather[0]!);
            return result;
        });
    }


    return (
        <>
            {
                state.map(item => (
                    <div key={item.name}>
                        <p>{item.name}</p>
                        {
                            item.childs.map(child => (
                                <div key={child.name}>
                                    <p>{child.name}</p>
                                    <p>{child.age}</p>
                                    <button onClick={() => changeAge(state.indexOf(item), item.childs.indexOf(child))}>change</button>
                                </div>
                            ))
                        }

                    </div>
                ))
            }
        </>
    )
}

const Child3 = () => {
    const [state, setState] = useState([
        {
            name: 'father1',
            childs: [1,2]
        },
        {
            name: 'child1-1',
            age: 1,
        },
        {
            name: 'child1-2',
            age: 2,
        },
        {
            name: 'father2',
            childs: [4,5]
        }, {
            name: 'child2-1',
            age: 3,
        },
        {
            name: 'child2-2',
            age: 4,
        }
    ]);
    const changeAge = (obj: any) => {
        setState(state => {
            const result = [...state];
            result.splice(result.indexOf(obj), 1, {
                ...obj,
                age: 77,
            })
            return result;
        })
    }


    return (
        <>
            {
                state.map(item => item.childs ? (
                    <div key={item.name}>
                        <p>{item.name}</p>
                        {
                            item.childs.map(index => (
                                <div key={index}>
                                    <p>{state[index]?.name}</p>
                                    <p>{state[index]?.age}</p>
                                    <button onClick={() => changeAge(state[index])}>change</button>
                                </div>
                            ))
                        }
                    </div>
                ): null)
            }
        
        </>
    )
}