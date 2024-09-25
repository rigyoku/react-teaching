import { ReactNode } from "react";
import { SWRWrapper } from "./client";

export default ({ children }: { children: ReactNode }) => <SWRWrapper>
    {children}
</SWRWrapper>;