import * as State from "./state.js";
import * as Program from "./program.js";

function map(x, f) {
    switch (true) {
    case (x instanceof State.Pure):
        return new State.Pure(f(x.value));
    case (x instanceof State.Bind): {
        const { op, next } = x;
        return new State.Bind(op, xv =>
            map(next(xv), f));
    }
    default:
        throw new Error(`Unknown state monad type ${x}`);
    }
}

function apply(f, x) {
    switch (true) {
    case (f instanceof State.Pure):
        return map(x, f.value);
    case (f instanceof State.Bind): {
        const { op, next } = f;
        return new State.Bind(op, v =>
            apply(next(v), x));
    }
    default:
        throw new Error(`Unknown state monad type ${x}`);
    }
}

function bind(x, f) {
    switch (true) {
    case (x instanceof State.Pure):
        return f(x.value);
    case (x instanceof State.Bind): {
        const { op, next } = x;
        return new State.Bind(op, xv =>
            bind(next(xv), f));
    }
    default:
        throw new Error(`Unknown state monad type ${x}`);
    }
}

function step(x, y) {
    switch (true) {
    case (x instanceof State.Pure):
        return y;
    case (x instanceof State.Bind): {
        const { op, next } = x;
        return new State.Bind(op, xv =>
            step(next(xv), y));
    }
    default:
        throw new Error(`Unknown state monad type ${x}`);
    }
}

export function flatten(node) {
    switch (true) {
    case (node instanceof Program.Pure): {
        return new State.Pure(node.value);
    }

    case (node instanceof Program.Bind): {
        const { x, f } = node;
        return bind(flatten(x), x => flatten(f(x)));
    }

    case (node instanceof Program.Step): {
        const { x, y } = node;
        return step(flatten(x), flatten(y));
    }

    case (node instanceof Program.Map): {
        const { x, f } = node;
        return map(flatten(x), f);
    }

    case (node instanceof Program.Apply): {
        const { x, f } = node;
        return apply(flatten(f), flatten(x));
    }

    case (node instanceof Program.Get):
        return State.get;

    case (node instanceof Program.Modify):
        return State.modify(node.f);

    case (node instanceof Program.Fragment):
        return State.fragment(node.f);

    case (node instanceof Program.Put):
        return State.put(node.s);

    default:
        throw new Error(`Unknown node type ${node}`);
    }
}

export default flatten;
