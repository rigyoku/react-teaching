export default async () => {
    await new Promise((res: Function) => {
        setTimeout(() => res(), 4000);
    })
    return <div>
        setTimeout
    </div>
}