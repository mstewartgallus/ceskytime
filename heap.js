export class Heap {
    #s;
    constructor(s) {
        this.#s = s;
    }

    static create(s) {
        return new Heap(new Map(s));
    }

    toString() {
        return Array.from(this.#s.entries()).toString();
    }
}

export default Heap;
