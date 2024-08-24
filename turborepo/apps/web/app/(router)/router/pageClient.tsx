'use client';

import { useContext } from "react";
import { context } from "./context";

export default () => {
    const value = useContext(context);

    if (2 < value && value < 5) {
        throw new Error(`value: ${value}`);
    }

    return <div>
        page client
    </div>
}