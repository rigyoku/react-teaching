'use client';

import { useActionState, useEffect } from "react";
import { action } from "./action";
import { useRouter, useSearchParams } from "next/navigation";
import { useInput } from "./input";

export const Client1 = () => {
    const params = useSearchParams();
    const num = params.get('num');

    const [state, dispatch, isPending] = useActionState(async (_: LoginResponse | null, formdata: FormData) => await action(formdata, num), null);
    const { code, msg } = state ?? {};

    return <>
        {
            isPending ? <div>Loading...</div>
                : <div>
                    <p>{code == 0 || msg}</p>
                    <form action={dispatch}>
                        <label htmlFor="username">username</label>
                        <input type="text" id="username" name="username" />
                        <br />

                        <label htmlFor="password">password</label>
                        <input type="password" id="password" name="password" />
                        <br />

                        <button type="submit">login</button>
                    </form>
                </div>
        }
    </>
}

export const Client2 = () => {
    const params = useSearchParams();
    const num = params.get('num');

    const [state, dispatch, isPending] = useActionState(async (_: LoginResponse | null, formdata: FormData) => await action(formdata, num), null);
    const { code, msg, jwt } = state ?? {};

    const [_username, username] = useInput({ name: 'username' });
    const [_password, password] = useInput({ type: 'password', name: 'password' });

    // useEffect(() => alert('_username change!!'), [_username]);
    // useEffect(() => alert('username change!!'), [username]);

    const router = useRouter();
    if (code == 0) {
        setTimeout(() => router.replace('/auth/01'), 1000);
        localStorage.setItem('token', jwt ?? '');
        return <div>
            auto redirect...
        </div>
    }

    return <>
        {
            isPending ? <div>Loading...</div>
                : <div>
                    <p>{ msg }</p>
                    <form action={dispatch}>
                        {username}

                        {password}

                        <button type="submit">login</button>
                    </form>
                </div>
        }
    </>
}