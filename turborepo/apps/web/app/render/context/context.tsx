'use client';

import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";

const defaultName = 'default';

const _context = createContext({
    name: defaultName,
    setName: (f: SetStateAction<string>) => { },
});

export const useName = () => useContext(_context);

export const NameProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState(defaultName)
    return <_context.Provider value={{ name, setName }}>
        {children}
    </_context.Provider>
};