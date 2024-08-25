import { ReactNode } from "react";

export default ({children, dialog}: {children: ReactNode, dialog: ReactNode}) => <div>
    Layout
    <br />
    {children}
    {dialog}
</div>