export class Stack {
    static create(k) {
        let stack = new Nil();
        for (const child of k) {
            stack = new Cons(child, stack);
        }
        return stack;
    }

    static cons(e, k) {
        return new Cons(e, k);
    }

    static pop(k) {
        return Cons.pop(k);
    }

    toString() {
        return Cons.entries(this).toString();
    }
}

class Cons extends Stack {
    #h;
    #t;

    constructor(h, t) {
        super();
        this.#h = h;
        this.#t = t;
    }

    static pop(k) {
        return [k.#h, k.#t];
    }

    static entries(k) {
        let entries = [];
        while (k instanceof Cons) {
            entries.push(k.#h);
            k = k.#t;
        }
        return entries;
    }
}

class Nil extends Stack {
    constructor() {
        super();
    }
}

export default Stack;
