export class Env {
    #e;

    constructor(e) {
        this.#e = e;
    }

    static create(e) {
        return new Env(new Map(e));
    }

    static get(name) {
        return e => e.#e.get(name);
    }

    static set(name, value) {
        return e => {
            const m = new Map(e.#e);
            m.set(name, value);
            return Object.freeze(new Env(Object.freeze(m)));
        };
    }

    toString() {
        return Array.from(this.#e.entries()).toString();
    }
}

export default Env;
