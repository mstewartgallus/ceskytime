import * as CESK from "./cesk.js";

export class Free {
    bind(f) {
        return bind(this, f);
    }
    step(y) {
        return bind(this, () => y);
    }
    apply(x) {
        return this.bind(fv => x.bind(xv => pure(fv(xv))));
    }

    map(f) {
        return bind(this, x => pure(f(x)));
    }
}

export class Bind extends Free {
    op;
    next;

    constructor(op, next) {
        super();
        this.op = op;
        this.next = next;
    }
}
export class Pure extends Free {
    value;

    constructor(value) {
        super();
        this.value = value;
    }
}

export const pure = v => new Pure(v);

function bind(x, f) {
    switch (true) {
    case (x instanceof Pure):
        return f(x.value);
    case (x instanceof Bind): {
        const { op, next } = x;
        return new Bind(op, xv =>
            bind(next(xv), f));
    }
    default:
        throw new Error(`Unknown free monad type ${x}`);
    }
}

export class Op {
};
export class PutOp extends Op {
    s;
    constructor(s) {
        super();
        this.s = s;
    }
}
export class GetOp extends Op {
}

const prim = op => new Bind(op, pure);

export const get = prim(new GetOp());
export const put = s => prim(new PutOp(s));
