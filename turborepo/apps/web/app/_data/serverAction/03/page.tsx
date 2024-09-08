'use client';

import { useActionState, useOptimistic, useState } from "react";
import { action, action1 } from "./action";

export default () => {
    // const [state, setState] = useState(false);
    // const [opt, setOpt] = useOptimistic(state);
    // const [state, newAction, loading] = useActionState(async (_: { name: string }, formdata: FormData) => await action(formdata), { name: '00' });

    return <div>
        Client call server action
        

        {/* <form action={action}>
            <input type="text" name="name"/>
            <button type="submit">submit</button>
        </form> */}

        {/* <br />
        state: {state ? 'true' : 'false'}
        <br />
        opt: {opt ? 'true' : 'false'}
        {
            state ? <div>state loading...</div> : null
        }
        {
            opt ? <div>opt loading...</div> : null
        }
        <form action={async formdata => {
            console.log('start');
            setState(true);
            setOpt(true);
            await action(formdata);
            setOpt(false);
            setState(false);
            console.log('end');
        }}>
            <input type="text" name="name" />
            <button type="submit">submit</button>
        </form> */}

        {/* <br />
        state: {state.name}
        <br />
        {
            loading ? <div>loading...</div> : null
        }
        <form action={newAction}>
            <input type="text" name="name"/>
            <button type="submit">submit</button>
        </form> */}

        {/* <form action={formdata => action('tag1', formdata)}> 
            <input type="text" name="name" />
            <button type="submit">submit</button>
        </form>
        <form action={action.bind(null, 'tag2')}>
            <input type="text" name="name" />
            <button type="submit">submit</button>
        </form> */}


        {/* <form action={action.bind(null, () => console.log(123))}>
            <input type="text" name="name" />
            <button type="submit">submit</button>
        </form> */}
        
        {/* <form action={action}>
            <input type="text" name="name" />
            <br />
            <button type="submit">submit</button>
            <br />
            <button formAction={formdata => action1('form action', formdata)}>form action</button>
            <br />
            <button onClick={e => e.currentTarget.form?.requestSubmit()}>request</button>
        </form> */}

        <br />
    </div>
}