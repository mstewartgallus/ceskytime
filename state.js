export class Pair {
    state;
    value;
    constructor(state, value) {
        this.state = state;
        this.value = value;
    }
};

export class State {
    bind(f) {
        return new Bind(this, f);
    }

    step(y) {
        return new Step(this, y);
    }

    apply(x) {
        return new Apply(this, x);
    }

    map(f) {
        return new Map(this, f);
    }
}

export class Bind extends State {
    x;
    f;

    constructor(x, f) {
        super();
        this.x = x;
        this.f = f;
    }
}

export class Map extends State {
    x;
    f;

    constructor(x, f) {
        super();
        this.x = x;
        this.f = f;
    }
}

export class Apply extends State {
    f;
    x;

    constructor(f, x) {
        super();
        this.f = f;
        this.x = x;
    }
}

export class Step extends State {
    x;
    y;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
}

export class Pure extends State {
    value;

    constructor(value) {
        super();
        this.value = value;
    }
}

export const pure = v => new Pure(v);

export class Put extends State {
    s;
    constructor(s) {
        super();
        this.s = s;
    }
}
export class Get extends State {
}

export class Modify extends State {
    f;
    constructor(f) {
        super();
        this.f = f;
    }
}

export class Fragment extends State {
    f;
    constructor(f) {
        super();
        this.f = f;
    }
}

export const get = new Get();
export const put = s => new Put(s);
export const modify = f => new Modify(f);
export const fragment = f => new Fragment(f);
