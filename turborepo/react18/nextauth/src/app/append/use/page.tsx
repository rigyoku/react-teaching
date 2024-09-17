'use client';

import { Suspense, use, useContext } from "react"
import { NameProvider, context } from "./context"


export default () => {
    return <NameProvider>
        {/* {
            new Array(10).fill('').map((_, index) => <Child key={index}/>)
        } */}
        <Child2 />
        <Suspense fallback='loading parent...'>
            <Child3 />
        </Suspense>
    </NameProvider>
}

const Child = () => {
    const name = useContext(context);
    return <div>{name.name}</div>
}

const Child2 = () => <div>
    {new Array(10).fill('').map((_, index) => <div key={index}>{use(context).name}</div>)}
</div>

const Child3 = () => {
    const promise = new Promise<string>(res => setTimeout(() => res('111'), 3000));
    return <Suspense fallback='loading child...'>
        <div>
            {use(promise)}
        </div>
    </Suspense>
}