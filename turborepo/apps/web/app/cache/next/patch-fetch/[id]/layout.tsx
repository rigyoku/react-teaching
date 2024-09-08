import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
    fetch('http://localhost:3001/api?name=patch-fetch-id-layout', {
        next: {
            revalidate: false,
        }
    });
    return children;
}