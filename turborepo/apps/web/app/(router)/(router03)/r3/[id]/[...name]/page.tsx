export default ({ params }: { params: { id: string, name: Array<string> } }) => <div>
    {
        `id : ${params.id}
        name : ${params.name}
        `
    }
</div>