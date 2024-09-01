'use server';

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

// export const action = async (name: string) => {
//     console.log(`event env: ${process.env.DATABASE_URL}`);
//     console.log(`event name: ${name}`);
//     return {
//         type: 'event',
//         name: `event-${name}`,
//     }
// }

export const action = async (name: string) => {
    if (cookies().get('name')?.value === 'liy') {
        return {
            type: 'event',
            name: `event-${name}`,
        }
    }
    throw new Error('error cookie');
    // redirect('/');
}


// export const action = async (formdata: FormData) => {
//     if (cookies().get('name')?.value === 'liy') {
//         return {
//             type: 'event',
//             name: `event-${name}`,
//         }
//     }
//     throw new Error('error cookie');
//     redirect('/');
// }

