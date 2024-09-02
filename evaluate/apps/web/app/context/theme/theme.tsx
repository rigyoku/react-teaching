'use client';

import { createContext, ReactNode, useReducer } from "react";

const defaultTheme = 'blue';

export const themeContext = createContext({
    color: defaultTheme,
    setColor: (_action: string) => {}
});

export const ThemeProvider = ({ children }: { children : ReactNode}) => {
    const reducer = (_state: string, action: string) => {
        return action;
    }
    const [color, dispatch] = useReducer(reducer, defaultTheme);
    return <>
        <themeContext.Provider value={{
            color: color,
            setColor: dispatch
        }}>
            {children}
        </themeContext.Provider>
    </>
}