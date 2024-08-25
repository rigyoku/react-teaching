
export default ({ params }: { params: { id?: Array<string> } }) => {
    console.log(`render ${params.id}`);
    return <div>
        {
            `id : ${params.id}`
        }
    </div>
}