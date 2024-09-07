import { ReactNode } from "react";
import { f1 } from "./cache";
import Count from "./count";

export default ({ children }: { children: ReactNode }) => <div>
    Template
    <br />
    {f1('Template')}
    <br />
    <Count />
    <hr />
    {children}
</div>