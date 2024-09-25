import { CONSTANT } from "@view/constants/const";
import { LoginForm } from "./client";

export default ({ searchParams } : {
    searchParams: { [CONSTANT.ACCOUNT.LOGIN.ERROR_MSG]?: string }
}) => <LoginForm pop={<div className="w-[40vw]">
    <p>AUTH_GITHUB_ID: {process.env.AUTH_GITHUB_ID}</p>
    <p>AUTH_GITHUB_SECRET: {process.env.AUTH_GITHUB_SECRET}</p>
    </div>} githubError={searchParams[CONSTANT.ACCOUNT.LOGIN.ERROR_MSG]} />