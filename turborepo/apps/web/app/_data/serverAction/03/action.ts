'use server';

// export const action = async (formdata: FormData) => {
//     console.log(`name : ${formdata.get('name') }`);
//     await new Promise((res) => setTimeout(() => res(null), 2000));
//     return {
//         name: '03'
//     }
// }


// export const action = async (tag: string, formdata: FormData) => {
//     console.log(`tag : ${tag}`);
//     console.log(`name : ${formdata.get('name')}`);
//     await new Promise((res) => setTimeout(() => res(null), 2000));
//     return {
//         name: '03'
//     }
// }

export const action = async (fun: Function, formdata: FormData) => {
    console.log(`fun : ${fun}`);
    console.log(`name : ${formdata.get('name')}`);
    await new Promise((res) => setTimeout(() => res(null), 2000));
    return {
        name: '03'
    }
}


// export const action = async (formdata: FormData) => {
//     console.log(`name : ${formdata.get('name')}`);
//     await new Promise((res) => setTimeout(() => res(null), 2000));
//     return {
//         name: '03'
//     }
// }

export const action1 = async (tag: string, formdata: FormData) => {
    console.log(`tag : ${tag}`);
    console.log(`name : ${formdata.get('name')}`);
    await new Promise((res) => setTimeout(() => res(null), 2000));
    return {
        name: '03'
    }
}

