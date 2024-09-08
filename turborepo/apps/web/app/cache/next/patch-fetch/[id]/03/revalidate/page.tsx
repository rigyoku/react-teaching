import { revalidatePath, revalidateTag } from "next/cache"

export default () => {
    revalidateTag('1');
    revalidatePath('/cache/next/patch-fetch');
    return <div>revalidate done</div>
}