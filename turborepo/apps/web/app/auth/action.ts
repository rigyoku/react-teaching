'use server';

import { cookies, headers } from "next/headers";
import { sign } from 'jsonwebtoken';

export const action = async (formdata: FormData, num: string | null): Promise<LoginResponse> => {
    'use server';
    const username = formdata.get('username');
    const password = formdata.get('password');
    await new Promise((res) => setTimeout(() => res(null), 2 * 1000));
    console.log(`username: ${username}. password: ${password}. num: ${num}`);
    // TODO 查db核对用户信息
    if (username == '123' && password == '123') {
        const token = btoa(JSON.stringify({
            username,
        }));
        // cookies().set('token', token);
        cookies().set({
            name: 'token',
            value: token, 
            maxAge: 120,
            httpOnly: true,
        });
        const jwt = sign({ username }, process.env.NAME || '', {
            expiresIn: 10,
        });
        return {
            code: 0,
            jwt,
        };
    } else {
        return {
            code: 1,
            msg: 'login fail :(',
        };
    }
    
}
