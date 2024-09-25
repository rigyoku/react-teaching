'use server';

import { prisma } from "@view/../prisma/prisma";
import { CONSTANT } from "@view/constants/const";
import { revalidateTag } from "next/cache";
import 'server-only';

export const addItem = async ({
    userId,
    name,
}: {
    userId: number,
    name: string,
    }) => {
    'use server';
    try {
        await prisma.user_items.create({
            data: {
                user_id: userId,
                name,
            }
        });
        revalidateTag(CONSTANT.APPLICATION.LIST.ITEMS_TAG);
    } catch (error) {
        
    }
};