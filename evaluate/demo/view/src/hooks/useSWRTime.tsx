'use client';

import { PATH } from "@view/constants/path";
import { useCallback, useMemo } from "react";
import useSWR from "swr";

export const useSWRTime = () => {
    const fetcher = useCallback(async (url: string) => (await fetch(url)).json(), []);
    const { data } = useSWR(PATH.API.SWR_TIME, fetcher);
    const node = useMemo(() => <div>
        data: {data}
    </div>, [data]);
    return node;
}