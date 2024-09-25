import { RegisterForm } from "./client";
import { CONSTANT } from "@view/constants/const";
import { cachedAuth } from "../server";
import { checkRegistered } from "./server";

export default async () => {
    await checkRegistered();
    const name = (await cachedAuth())?.user?.name;
    return <RegisterForm defaultUsername={name} skipText={name ? CONSTANT.ACCOUNT.REGISTER.SKIP : undefined} />;
}