import * as Kont from "./kont.js";

export const exec = (c, s) => {
    for (;;) {
        console.log(c);
        console.log(s);
        const k = c(s);
        if (k instanceof Kont.Halt) {
            return {v:k.value, s};
        }
        c = k.next;
        s = k.state;
    }
}

export default exec;
