'use server';

import { revalidatePath, revalidateTag } from "next/cache";

export const action = async (id: string, formData: FormData) => {
    'use server';
    const name = formData.get('name');

    if (name == '3') {
        revalidatePath(`/cache/next/patch-fetch/${id}/03`);
    } else if (name == '4') {
        revalidatePath('/cache/next/patch-fetch');
    } else if (typeof name == 'string') {
        revalidateTag(name);
    }
}