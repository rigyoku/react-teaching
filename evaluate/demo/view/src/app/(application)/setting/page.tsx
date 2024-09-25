import { Suspense } from "react";
import { cachedUserIdAndName } from "../server";
import { SettingForm } from "./client";
import { SettingServer, SettingServerFetch, updateTheme } from "./server";
import { CONSTANT } from "@view/constants/const";

export default async () => {
    SettingServerFetch('3');
    const { id } = await cachedUserIdAndName();
    return <Suspense fallback={ `${CONSTANT.GLOBAL.LOADING} for 5` }>
        <SettingServer time="5">
            <Suspense fallback={`${CONSTANT.GLOBAL.LOADING} for 3`}>
                <SettingServer time="3">
                    <SettingForm updateTheme={updateTheme} userId={id!} />
                </SettingServer>
            </Suspense>
        </SettingServer>
    </Suspense>
};