'use client';

import { useName } from "./context";

export const Client = () => {
    const {name, setName} = useName();
    return <div>
        child name: {name}
        <br />
        <button onClick={() => setName(name => `${name}A`)}>apend A</button>
    </div>
}