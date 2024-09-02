import getLocal from '@repo/local/getLocal';
import { LocalType } from '@repo/local/base';

export default ({ params }: { params: { local: LocalType } }) => {
    return <>
        <p>runtime env NAME: {process.env.NAME}</p>
        <p>file env NAME: {process.env.ENV_NAME}</p>
        <form action={`/af/api/login`} method="post">
            <label htmlFor="pw">{getLocal(params.local).password}</label>
            <input type="password" name="pw" id="pw" />
            <br />
            <button type="submit">submit</button>
        </form>
    </>
}