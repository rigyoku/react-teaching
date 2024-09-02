import { LocalType } from "@repo/local/base";

export const generateStaticParams = async () => {
    return [
        {
            local: 'cn',
            id: '1',
        },
        {
            local: 'cn',
            id: '2',
        },
        {
            local: 'cn',
            id: '3',
        },
        {
            local: 'en',
            id: '1',
        },
        {
            local: 'en',
            id: '2',
        },
        {
            local: 'en',
            id: '3',
        }
    ]
};

export const dynamicParams = false;

export default async ({params}: {params: {local: LocalType, id: string}}) => {
    const { id } = params;
    await new Promise((res: (_: unknown) => void) => setTimeout(() => res(''), 3000));
    return <div>id: {id}</div>
}
