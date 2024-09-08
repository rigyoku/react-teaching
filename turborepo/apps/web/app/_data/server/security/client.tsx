'use client';

import { useState } from "react";
import data from "./data";

export default ({name, obj}: {name: string, obj?: {name: string}}) => {
    useState(0);
    return <div>
        Client
        <br />
        {name}
        <br />
        {obj?.name}
        <br />
        {/* {data.name} */}
    </div>
}