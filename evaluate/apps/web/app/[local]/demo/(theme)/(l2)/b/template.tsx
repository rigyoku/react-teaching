'use client';

import { ReactNode, useContext } from "react";
import { themeContext } from "../../../../../context/theme/theme";

export default ({ children }: { children : ReactNode}) => {
    const { color } = useContext(themeContext);
    return <div style={{
        border: 'solid',
        borderColor: color,
    }}>
        {children}
    </div>
}