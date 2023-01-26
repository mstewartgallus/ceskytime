import * as C from "./control.js";
import Machine from "./machine.js";
import Heap from "./heap.js";
import Stack from "./stack.js";
import Env from "./env.js";
import * as M from "./machine.js";
import compile from "./compile.js";
import flatten from "./flatten.js";
import emit from "./emit.js";
import jit from "./jit.js";
import exec from "./exec.js";

const h1 = C.elm("h1");

const heading = h1([
    C.txt("Hello"),
    C.vr("x").to("y",
                 C.vr("y").map(x => C.txt("world " + x)))
]);

const e = Env.create(Object.entries({
    x: "Molo",
}));
const s = Heap.create([]);
const k = Stack.create([]);

console.log(heading);

const code = compile(heading);

console.log(code);

const state = flatten(code);

console.log(state);

const bit = emit(state);

console.log(bit);

const j = jit(bit);

console.log(j);

const result = exec(j, new Machine(e, s, k));

console.log(result.v);
