'use client';

import { useContext } from "react"
import { NameProvider, context } from "./context"


export default () => {
    return <NameProvider>
        {
            new Array(10).fill('').map(_ => <Child />)
        }
    </NameProvider>
}

const Child = () => {
    const name = useContext(context);
    return <div>{name.name}</div>
}