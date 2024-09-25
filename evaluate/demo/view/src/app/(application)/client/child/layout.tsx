import { ReactNode } from "react";

export default ({ children, append }: { children: ReactNode, append: ReactNode }) => <div className="flex h-full">
    <div className="w-80">{children}</div>
    <div className="w-1 m-2 bg-bg.primaryBtn" />
    {append}
</div>