import { LocalType } from "../../local/base";
import getLocal from "../../local/getLocal";

export const generateStaticParams = () => [
    {
        local: 'cn',
    }, {
        local: 'en',
    }
]

export const dynamicParams = false;

export default ({params}: {params: {local: LocalType}}) => <div>
    name is {getLocal(params.local).name}
</div>