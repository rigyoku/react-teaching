'use server';

export const formActioin = async (formdata: FormData) => {
    console.log(`action env: ${process.env.DATABASE_URL}`);
    console.log(`action formdata: ${formdata.get('name')}`);
    console.log(`action formdata: ${formdata.get('append')}`);
    await new Promise((res) => setTimeout(() => res(null), 2000));
    return {
        type: 'form',
    }
}