
import { redirect } from "next/navigation";
import { verify, JwtPayload } from 'jsonwebtoken';
import { headers } from "next/headers";
import { NextResponse } from "next/server";


const checkJWT = () => {
    const jwt = headers().get('token');
    if (jwt != null) {
        try {
            const token = verify(jwt, process.env.NAME || '') as JwtPayload;
            if (typeof token != 'string') {
                // TODO 快过期了更新jwt
                if (token.username === '123') {
                    return true;
                }
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    return false;
}
export const GET = () => {
    if (checkJWT()) {
        return NextResponse.json('123');
    } else {
        return NextResponse.json('error');
    }
}