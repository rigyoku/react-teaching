'use server';

import { cookies } from "next/headers";

export const S1 = ({name}: {name: string}) => {
    cookies();
    return <div>
        {name}: {process.env.NAME}
    </div>;
}