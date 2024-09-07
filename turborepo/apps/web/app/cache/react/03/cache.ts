import { cache } from "react";

export const f1 = cache((name: string) => {
    // const res = `${name} call f1. random: ${Math.random()}`;
    const res = `${name} call f1.`;
    console.log(res);
    return res;
});