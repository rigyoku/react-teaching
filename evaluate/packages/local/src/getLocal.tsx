import { LocalType } from "./local/base";
import { cn } from "./local/cn";
import { en } from "./local/en";

export default (local: LocalType) => {
    if (local === 'cn') {
        return cn;
    }
    return en;
}