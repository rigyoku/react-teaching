import { ReactNode } from "react";
import { PerformanceInput } from "./client";

export default ({ children }: { children: ReactNode }) => <>
    <PerformanceInput />
    {children}
</>;