'use client';

import { ReactNode } from "react";
import { ThemeProvider } from "../../context/theme/theme";

export default ({ children }: { children: ReactNode }) => <div style={{ height: '100vh' }}>
    {
        <ThemeProvider>
            {children}
        </ThemeProvider>
    }
</div>