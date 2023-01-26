import * as CESK from "./cesk.js";
import * as State from "./state.js";
import Pair from "./pair.js";

const get = f => s => {
    return new Pair(f(s), s);
};

const put = (newS, c) => s => {
    return new Pair(c, newS);
};

export const emit = t => {
    switch (true) {
    case (t instanceof State.Bind): {
        const { op, next } = t;
        switch (true) {
        case (op instanceof State.GetOp):
            return CESK.step(get(s => emit(next(s))));

        case (op instanceof State.PutOp): {
            const c = emit(next(null));
            const newS = op.s;
            return CESK.step(put(newS, c));
        }
        default:
            throw new Error(`Unknown op ${op}`);
        }
    }

    case (t instanceof State.Pure): {
        const { value } = t;
        return CESK.halt(value);
    }

    default:
        throw new Error(`Unknown state monad type ${t}`);
    }
}
