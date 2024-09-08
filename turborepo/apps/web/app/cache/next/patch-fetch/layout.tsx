import { ReactNode } from "react";

export default async ({ children }: { children: ReactNode }) => {
    const res = await (await fetch(`http://localhost:3001/api?time=2`, {
        next: {
            revalidate: false,
        }
    })).json();
    return <>
        Layout {res}
        <hr />
        {children}
    </>;
}