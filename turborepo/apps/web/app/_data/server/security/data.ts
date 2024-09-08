// import 'server-only';

import { experimental_taintObjectReference, experimental_taintUniqueValue } from "react";

const data = {
    name: 'liy',
}

// experimental_taintObjectReference('taint data msg', data);

// experimental_taintUniqueValue('taint name msg', data, data.name);

export default data;