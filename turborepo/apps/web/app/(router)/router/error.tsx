'use client';
export default ({ error, reset }: { error: Error, reset: () => void }) => {
    return <div>
        error...
        {error.message}
        <br />
        <button onClick={() => reset()}>reset</button>
    </div>
}