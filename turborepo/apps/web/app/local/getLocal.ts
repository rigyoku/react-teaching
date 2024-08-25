import { LocalType } from "./base";
import { local as cn } from './cn';
import { local as en } from './en';


export default (local: LocalType) => {
    if (local === 'cn') {
        return cn;
    }
    return en;
}