export class State {
}

export class Bind extends State {
    op;
    next;

    constructor(op, next) {
        super();
        this.op = op;
        this.next = next;
    }
}
export class Pure extends State {
    value;

    constructor(value) {
        super();
        this.value = value;
    }
}

export class Op {
};
export class FragmentOp extends Op {
    f;
    constructor(f) {
        super();
        this.f = f;
    }
}
export class ModifyOp extends Op {
    f;
    constructor(f) {
        super();
        this.f = f;
    }
}
export class PutOp extends Op {
    s;
    constructor(s) {
        super();
        this.s = s;
    }
}
export class GetOp extends Op {
}

const pure = x => new Pure(x);
const prim = op => new Bind(op, pure);

export const get = prim(new GetOp());
export const put = s => prim(new PutOp(s));
export const modify = f => prim(new ModifyOp(f));
export const fragment = f => prim(new FragmentOp(f));
