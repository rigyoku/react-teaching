'use client';

import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";

const defaultName = 'default';

export const context = createContext({
    name: defaultName,
    setName: (f: SetStateAction<string>) => { },
});

export const useName = () => useContext(context);

export const NameProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState(defaultName);
    return <context.Provider value={{ name, setName }}>
        {children}
    </context.Provider>
};