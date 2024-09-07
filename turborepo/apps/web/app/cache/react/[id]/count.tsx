'use client';

import { useState } from "react";

export default () => {
    const [state, setState] = useState(0);
    return <div>
        {state}
        <button onClick={() => setState(state => state + 1)}>Add</button>
    </div>
}