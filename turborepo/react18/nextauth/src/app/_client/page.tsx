'use client';
import { signIn, signOut, useSession } from "next-auth/react"
export default () => {
    const {data, status} = useSession();
    return <div>
        client
        <hr />
        status: {status}
        <br />
        data: {JSON.stringify(data)}
        <hr />
        <button onClick={() => signIn()}>sign in</button>
        <br />
        <button onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000/auth'})}>sign in redirect</button>
        <hr />
        <button onClick={() => signOut()}>sign out</button>
        <br />
        <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/auth' })}>sign out redirect</button>
    </div>
}