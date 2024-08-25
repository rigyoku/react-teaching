export default async () => {
    // throw new Error('123');
    await new Promise((res: (value: unknown) => void) => setTimeout(() => res(''), 3000));
    return <div>r4 p1 ==== p3 Page</div>;
}