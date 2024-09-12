import { cookies } from "next/headers";

export const Child = () => <>
    {cookies().get('_ga')?.value}
</>