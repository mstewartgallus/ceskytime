export class Instr {
}

export class Get extends Instr {
    next;
    constructor(next) {
        super();
        this.next = next;
    }
}
export class Put extends Instr {
    value;
    next;
    constructor(value, next) {
        super();
        this.value = value;
        this.next = next;
    }
}
export class Halt extends Instr {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
}
