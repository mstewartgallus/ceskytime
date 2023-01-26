import * as Free from "./free.js";
import * as State from "./state.js";

function map(x, f) {
    switch (true) {
    case (x instanceof Free.Pure):
        return new Free.Pure(f(x.value));
    case (x instanceof Free.Bind): {
        const { op, next } = x;
        return new Free.Bind(op, xv =>
            map(next(xv), f));
    }
    default:
        throw new Error(`Unknown free monad type ${x}`);
    }
}

function bind(x, f) {
    switch (true) {
    case (x instanceof Free.Pure):
        return f(x.value);
    case (x instanceof Free.Bind): {
        const { op, next } = x;
        return new Free.Bind(op, xv =>
            bind(next(xv), f));
    }
    default:
        throw new Error(`Unknown free monad type ${x}`);
    }
}

function step(x, y) {
    switch (true) {
    case (x instanceof Free.Pure):
        return y;
    case (x instanceof Free.Bind): {
        const { op, next } = x;
        return new Free.Bind(op, xv =>
            step(next(xv), y));
    }
    default:
        throw new Error(`Unknown free monad type ${x}`);
    }
}

export function flatten(node) {
    switch (true) {
    case (node instanceof State.Pure): {
        return new Free.Pure(node.value);
    }

    case (node instanceof State.Bind): {
        const { x, f } = node;
        return bind(flatten(x), x => flatten(f(x)));
    }

    case (node instanceof State.Step): {
        const { x, y } = node;
        return step(flatten(x), flatten(y));
    }

    case (node instanceof State.Map): {
        const { x, f } = node;
        return map(flatten(x), f);
    }

    case (node instanceof State.Get):
        return Free.get;

    case (node instanceof State.Put):
        return Free.put(node.s);

    default:
        throw new Error(`Unknown node type ${node}`);
    }
}

export default flatten;
