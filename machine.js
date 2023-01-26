import Env from "./env.js";
import Heap from "./heap.js";
import Stack from "./stack.js";

export class Machine {
    #e;
    #s;
    #k;

    constructor(e, s, k) {
        this.#e = e;
        this.#s = s;
        this.#k = k;
    }

    toString() {
        const e = this.#e;
        const s = this.#s;
        const k = this.#k;
        return `{e: ${e}, s: ${s}, k: ${k}}`;
    }

    static save(m) {
        let e = m.#e;
        let k = m.#k;
        k = Stack.cons(e, k);
        return new Machine(e, m.#s, k);
    }

    static restore(m) {
        let e = m.#e;
        let k = m.#k;
        ([e, k] = Stack.pop(k));
        return new Machine(e, m.#s, k);
    }

    static set(name, value) {
        const setter = Env.set(name, value);
        return m => {
            return new Machine(setter(m.#e), m.#s, m.#k);
        };
    }

    static get(name) {
        const getter = Env.get(name);
        return m => getter(m.#e);
    }
}

export default Machine;
