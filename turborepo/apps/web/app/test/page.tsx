'use client';

import { sc } from "./action";

export default () => {
    return (
        <form action={sc}>
            <input type="hidden" name="name" value={new Array(512 * 1024).fill('1')} />
            <button type="submit">submit</button>
        </form>
    )
}