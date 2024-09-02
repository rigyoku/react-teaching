import { ReactNode } from "react";

export default ({ children, dialog }: { children: ReactNode, dialog: ReactNode }) => <>
    {children}
    {dialog}
</>