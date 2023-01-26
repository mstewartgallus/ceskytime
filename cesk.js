export class Instr {
};

export class Halt extends Instr {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
}

export class Step extends Instr {
    step;
    constructor(step) {
        super();
        this.step = step;
    }
}

export const step = s => new Step(s);
export const halt = v => new Halt(v);
