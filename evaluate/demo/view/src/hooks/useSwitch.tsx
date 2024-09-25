'use client';
import { ReactNode, useMemo, useState } from "react";

export const useSwitch: <T extends string>(items: Readonly<Array<T>>, defaultId?: number,) => {
    currentId: number,
    current: T,
    switchNode: ReactNode,
} = (items, defaultId = 0) => {
    const [ currentId, setCurrentId ] = useState(defaultId);
    const { switchNode, current } = useMemo(() => ({
        switchNode: <div className="mb-5">
            {items.map((item, index) => <button key={index} className={`${currentId === index ? 'bg-bg.primaryBtn text-text.primaryBtn' : 'bg-bg.normalBtn'} w-32 view-border mr-2`} onClick={() => setCurrentId(index)}>{item}</button>)}
        </div>,
        current: items[currentId],
    }), [items, currentId]);
    return {
        currentId,
        current,
        switchNode,
    };
}