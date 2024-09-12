import { cookies } from "next/headers";

export default async () => {
    cookies();
    return <div>server</div>;
}

export const Child = () => <>
    {cookies().get('_ga')?.value}
</>