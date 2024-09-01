'use client';

import { useEffect } from "react";
import { action } from "./action";

export default () => {
    const callAction = async () => {
        try {
            const res = await action('clientData');
            console.log(res);
        } catch (error) {
            alert(`catch error: ${(error as Error).message}`);
        }
    }
    // useEffect(() => {
    //     callAction();
    // }, []);
    return <div>
        Client call server action
        <br />
        <button onClick={callAction}>click</button>

        {/* <form action={action}>
            <button type="submit">submit</button>
        </form> */}
    </div>
}