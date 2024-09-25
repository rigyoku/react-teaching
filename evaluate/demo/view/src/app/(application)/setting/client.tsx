'use client';

import { useDialog } from "@view/components/dialogWrapper";
import { CONSTANT } from "@view/constants/const";
import { useInput } from "@view/hooks/useInput";
import { useLoaction } from "@view/hooks/useLocation";
import { useRouter } from "next/navigation";

export const SettingForm = ({ updateTheme, userId }: {
    updateTheme: (param: {
        theme: string,
        location: string,
        userId: number,
    }) => Promise<void>, userId: number
}) => {
    const { autoMissDialog } = useDialog();
    const route = useRouter();
    const location = useLoaction();
    const { input, text, checked, reset } = useInput({
        name: 'theme',
        notNull: true,
    });

    return <div>
        {input}
        <button className={`${checked || 'disabled:opacity-50'} mr-12 bg-bg.primaryBtn view-border`} disabled={!checked} onClick={async () => {
            updateTheme({
                theme: text,
                location,
                userId,
            });
            route.refresh();
            reset();
            autoMissDialog({
                show: true,
                node: CONSTANT.APPLICATION.SETTING.UPDATED_THEME,
                cancelHidden: true,
                className: 'w-60 h-10',
            }, 2);
        }}>{CONSTANT.APPLICATION.CONFIRM}</button>
    </div>
}