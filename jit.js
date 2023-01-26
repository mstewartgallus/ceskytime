import * as Kont from "./kont.js";
import * as Instr from "./instr.js";
import * as State from "./state.js";

// Not really jitting. Knitting together closures but eh

const get = f => s => new Kont.Step(f(s), s);
const put = (newS, c) => s => new Kont.Step(c, newS);
const halt = value => s => new Kont.Halt(value);
const modify = (f, c) => s => new Kont.Step(c, f(s));
const fragment = (f, c) => s => {
    const { state, value} = f(s);
    return new Kont.Step(c(value), state);
};

export const jit = t => {
    switch (true) {
    case (t instanceof Instr.Get): {
        const { next } = t
        return get(s => jit(next(s)));
    }

    case (t instanceof Instr.Put): {
        const { value, next } = t
        return put(value, jit(next));
    }
    case (t instanceof Instr.Modify): {
        const { f, next } = t
        return modify(f, jit(next));
    }
    case (t instanceof Instr.Fragment): {
        const { f, next } = t
        return fragment(f, s => jit(next(s)));
    }

    case (t instanceof Instr.Halt):
        return halt(t.value);

    default:
        throw new Error(`Unknown instruction ${t}`);
    }
}

export default jit;
