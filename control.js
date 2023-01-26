export class Control {
    to(name, rest) {
        return new LetControl(name, this, rest);
    }

    apply(x) {
        return new Apply(this, x);
    }

    map(f) {
        return new Pure(f).apply(this);
    }
}

export class Node extends Control {
}

export class FragmentNode extends Node {
    children;

    constructor(children) {
        super();
        this.children = children;
    }
}

export class ElementNode extends Node {
    tag;
    children;

    constructor(tag, children) {
        super();
        this.tag = tag;
        this.children = children;
    }
}
export class TextNode extends Node {
    text;

    constructor(text) {
        super();
        this.text = text;
    }
}

export class VarControl extends Control {
    name;
    constructor(name) {
        super();
        this.name = name;
    }
}

export class LetControl extends Control {
    name;
    value;
    rest;

    constructor(name, value, rest) {
        super();
        this.name = name;
        this.value = value;
        this.rest = rest;
    }
}

export class Pure extends Control {
    value;

    constructor(value) {
        super();
        this.value = value;
    }
}
export class Apply extends Control {
    modify;
    next;

    constructor(modify, next) {
        super();
        this.modify = modify;
        this.next = next;
    }
}

export const txt = str => new TextNode(str);
export const elm = str => children => new ElementNode(str, children);
export const frg = children => new FragmentNode(children);
export const vr = name => new VarControl(name);
export const pure = value => new Pure(value);
