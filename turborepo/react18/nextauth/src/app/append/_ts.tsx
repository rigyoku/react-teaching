type A = {
    a: 'A',
    b: 'B',
}

type AKey = keyof A;
type AValue = A[AKey]

const B = {
    a: 'A',
    b: 'B',
} as const;

// const B: {
//     readonly a: 'A',
//     readonly b: 'B',
// } = {
//     a: 'A',
//     b: 'B',
// };
type BKey = keyof typeof B;
type BType = typeof B;
type BValue = BType[BKey]

const B2 = {
    a: 'A',
    b: 'B',
    c: 1
};
type B2Type = Readonly<typeof B2>; 
// (B2 as B2Type).a = '1';
type B3 = Omit<typeof B2, 'a'>;
type B4 = Pick<typeof B2, 'a'>;

export default async () => {
    const res = await new Promise<{name : number}>(res => setTimeout(() => res({ name: 123 }), 1000));

    const a: AKey = 'a';
    
    return <div>ts</div>
}