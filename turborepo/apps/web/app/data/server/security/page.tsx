import Client from "./client";
import data from "./data";

export default () => {

    return <div>
        Server
        <br />
        {data.name}
        <br />
        <Client name={data.name} />

        {/* <Client name={data.name} obj={data} /> */}
    </div>
}