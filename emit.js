import * as Free from "./free.js";
import * as Instr from "./instr.js";

export const emit = t => {
    switch (true) {
    case (t instanceof Free.Bind): {
        const { op, next } = t;
        switch (true) {
        case (op instanceof Free.GetOp):
            return new Instr.Get(s => emit(next(s)));

        case (op instanceof Free.PutOp): {
            const c = emit(next(null));
            const newS = op.s;
            return new Instr.Put(newS, c);
        }
        default:
            throw new Error(`Unknown op ${op}`);
        }
    }

    case (t instanceof Free.Pure): {
        const { value } = t;
        return new Instr.Halt(value);
    }

    default:
        throw new Error(`Unknown state monad type ${t}`);
    }
}

export default emit;
