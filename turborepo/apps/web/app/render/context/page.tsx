import { Client } from "./client";

export default () => <div>
    page: {process.env.NAME}
    <br />
    <Client/>
</div>