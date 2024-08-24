'use client';
export default ({ children }: { children: JSX.Element }) => {
    console.log('template layout render');

    return <div>
        router template

        <br />

        <div>
            {
                children
            }
        </div>
    </div>
}