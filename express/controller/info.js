export const info01 = (_, res) => {
    res.send('ok');
}

export const info02 = (_, res) => {
    res.send(JSON.stringify([
        {
            name: 'n3',
            price: '450',
        },
        {
            name: 'n2',
            price: '550',
        },
    ]));
}