'use client';

import { useEffect } from "react";
import { get } from "./util/request";

export default function Home() {

  const init = async () => {
    const res = await get<string>('/info');
    console.error(res);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello
      <br>
      </br>
      {process.env.NEXT_PUBLIC_API_PATH}
    </main>
  );
}
