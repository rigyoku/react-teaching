import { ReactNode } from "react";

export default () => {
    fetch('http://localhost:3001/api?name=patch-fetch-page', {
        next: {
            revalidate: false,
        }
    });
    return <div>page</div>;
}