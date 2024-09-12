import { C1 } from "./client";
import { S1 } from "./server";

export default () => <div>
    page: {process.env.NAME}
    <C1 s1={<S1 name="s1" />} s2={<S1 name="s2" />} />
    
</div>