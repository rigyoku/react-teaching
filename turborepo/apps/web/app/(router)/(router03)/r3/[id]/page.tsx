export const generateStaticParams = async () => {
    // await fetch('')
    return [
        {
            id: '1',
        },
        {
            id: '2',
        },
    ];
};

export const dynamicParams = false;

export default ({ params }: { params: { id: string } }) => {
    console.log(`render ${params.id}`);
    <div>
        {
            `id : ${params.id}`
        }
    </div>
}