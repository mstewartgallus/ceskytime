import * as CESK from "./cesk.js";
import * as C from "./control.js";
import Machine from "./machine.js";
import { compile } from "./compile.js";
import { emit } from "./emit.js";
import { exec } from "./exec.js";

const h1 = C.elm("h1");

const heading = h1([
    C.txt("Hello"),
    C.vr("x").to("y",
                 C.vr("y").map(x => C.txt("world " + x)))
]);

const e = {
    x: "Molo",
};
const s = {};
const k = [];

console.log(heading);

const code = compile(heading);

console.log(code);

const bit = emit(code);

console.log(bit);

const result = exec(bit, new Machine(e, s, k));

console.log(result.v);
