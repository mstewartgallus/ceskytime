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

export const get = new Get();
export const put = s => new Put(s);
