import { signIn, signOut } from "@/nextauth"
import Link from "next/link";

export default async () => {

    return <div>
        server
        <hr />
        

        <form action={async () => {
            "use server"
            await signIn();
        }}>
            <button type="submit">signIn</button>
            <br />
            <button formAction={async () => {
                "use server"
                await signIn('github', { redirectTo: 'http://localhost:3000/auth' });
            }}>sign in redirect</button>
        </form>
        <br />
        <form action={async () => {
            "use server"
            await signOut();
        }}>
            <button type="submit">signOut</button>
            <br />
            <button formAction={async () => {
                "use server"
                await signOut({ redirectTo: 'http://localhost:3000/auth' });
            }}>sign out redirect</button>
        </form>

        <br />
        <Link href={'/auth'}>to auth</Link>
    </div>;
}