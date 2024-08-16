import React from 'react';
import { createContext } from 'react';

export const context1 = createContext(0);
export const context2 = createContext('liy');
// export const context3 = createContext((() => 1) as React.Dispatch<React.SetStateAction<number>>);
export const context3 = createContext(((a:string) => 1) as React.Dispatch<string>);
export const constant = 0;

export const reducer = (state: number, action: string): number => {
    if (action == '1') {
        return 1;
    }
    return 0;
}
