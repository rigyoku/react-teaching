import Wrapper from "./wrapper";

export default () => <div>
    {process.env.NAME}
    <br />
    <Wrapper name={process.env.NAME} />
</div>