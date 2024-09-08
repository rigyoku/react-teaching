'use client';

import { useState } from "react";

export const ClientChild = ({ action }: { action: (formdata: FormData) => Promise<{ type: string }> }) => {
    const [state, setState] = useState('');
    return <form action={action}>
        <input type="text" name="name" value={state} onChange={e => setState(e.target.value)} />
        <input type="hidden" name="append" defaultValue={'append'} disabled />
        <button type="submit">child submit</button>
    </form>
}