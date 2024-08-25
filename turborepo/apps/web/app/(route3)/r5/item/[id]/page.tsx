export default ({params}: {params: {id: string}}) => {
    console.log(params.id);

    return <div>
        r5 item {params.id}
    </div>
}