import { auth } from "@/nextauth";


export default async () => {
    const session = await auth();
    if (session?.user) {
        return 'welcome ~';
    } else {
        return 'please sign in';
    }
}