export const Client = ({ name }: { name?: string }) =>
    <button onClick={() => {
        debugger
        alert(`env: ${process.env.NAME} ${name ? `// props name:${name}` : ''}`);
    }}>click</button>