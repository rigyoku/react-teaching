'use server';

export const sc = async (_: FormData) => {
    await new Promise((res) => setTimeout(res, 2000));
    return '123';
}