import * as CESK from "./cesk.js";
import Pair from "./pair.js";

export const exec = (c, s) => {
    while (c instanceof CESK.Step) {
        console.log(s);
        const pair = (c.step)(s);
        c = pair.fst;
        s = pair.snd;
    }
    return {v:c.value, s};
}
