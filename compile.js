import * as State from "./state.js";
import * as C from "./control.js";
import Machine from "./machine.js";

const save = State.modify(Machine.save);
const restore = State.modify(Machine.restore);
const set = (name, x) => State.modify(Machine.set(name, x));
const get = name => State.get.map(Machine.get(name));

const local = c =>
      save
      .step(c)
      .bind(x =>
          restore
              .step(State.pure(x)));

const apply = (modify, next) =>
      local(local(modify).apply(next));

const lt = (name, value, rest) =>
      local(local(value)
            .bind(x => set(name, x))
            .step(rest));

const elm_nil = tag => State.pure(C.elm(tag)([]));
const elm_app = (t, h) =>
      local(State.pure(tv => hv => C.elm(tv.tag)([...tv.children, hv]))
            .apply(local(t))
            .apply(h));

const frg_nil = State.pure(C.frg([]));
const frg_app = (t, h) =>
      local(State.pure(tv => hv => C.frg([...tv.children, hv]))
            .apply(local(t))
            .apply(h));

const elmof = (tag, children) => {
    let result = elm_nil(tag);
    for (const child of children) {
        result = elm_app(result, child);
    }
    return result;
};

const frgof = children => {
    let result = frg_nil;
    for (const child of childrenC) {
        result = frg_app(child, result);
    }
    return result;
};

export function compile(node) {
    switch (true) {
    case (node instanceof C.Pure): {
        const { value } = node;
        return State.pure(value);
    }

    case (node instanceof C.Apply): {
        const { modify, next } = node;
        return apply(compile(modify), compile(next));
    }

    case (node instanceof C.TextNode): {
        const { text } = node;
        return State.pure(C.txt(text));
    }

    case (node instanceof C.ElementNode): {
        const { tag, children } = node;
        return elmof(tag, children.map(compile));
    }

    case (node instanceof C.FragmentNode): {
        const { children } = node;
        return frgof(children.map(compile));
    }

    case (node instanceof C.VarControl): {
        return get(node.name);
    }

    case (node instanceof C.LetControl): {
        const { name, value, rest } = node;
        return lt(name, compile(value), compile(rest));
    }

    default:
        throw new Error(`Unknown node type ${node}`);
    }
}

export default compile;
