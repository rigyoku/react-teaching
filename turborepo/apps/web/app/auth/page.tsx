'use server';

import Image from "next/image";
import { Client1, Client2 } from "./client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async () => {
    // checkCookie();
    return <div>
        <Image src={'/globe.svg'} alt='' width={100} height={40} />
        <Client2 />
    </div>
}

const checkCookie = () => {
    const { value } = cookies().get('token') ?? {};
    let shoulRedirect = false;
    if (value != null) {
        const token = atob(value);
        try {
            console.log('token', token);
            const { username } = JSON.parse(token);
            console.log('username', username);
            shoulRedirect = '123' == username;
            // redirect('/auth/01');
        } catch (error) {

        }
    }
    if (shoulRedirect) {
        redirect('/auth/01');
    }
}