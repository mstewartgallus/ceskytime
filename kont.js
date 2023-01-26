export class Kont {
};

export class Halt extends Kont {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
}

export class Step extends Kont {
    next;
    state;

    constructor(next, state) {
        super();
        this.next = next;
        this.state = state;
    }
}
