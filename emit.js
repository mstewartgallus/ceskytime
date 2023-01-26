import * as State from "./state.js";
import * as Instr from "./instr.js";

export const emit = t => {
    switch (true) {
    case (t instanceof State.Bind): {
        const { op, next } = t;
        switch (true) {
        case (op instanceof State.GetOp):
            return new Instr.Get(s => emit(next(s)));

        case (op instanceof State.PutOp): {
            const c = emit(next(null));
            return new Instr.Put(op.s, c);
        }
        case (op instanceof State.ModifyOp): {
            const c = emit(next(null));
            return new Instr.Modify(op.f, c);
        }
        case (op instanceof State.FragmentOp): {
            return new Instr.Fragment(op.f, s => emit(next(s)));
        }
        default:
            throw new Error(`Unknown op ${op}`);
        }
    }

    case (t instanceof State.Pure): {
        const { value } = t;
        return new Instr.Halt(value);
    }

    default:
        throw new Error(`Unknown state monad type ${t}`);
    }
}

export default emit;
