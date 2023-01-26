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
