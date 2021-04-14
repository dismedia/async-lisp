import * as  readline from "readline";
import {Interperter} from "../lexer/domain";
import {compilableCreators} from "../interpreter/compilableCreators";
import {buildInterpreter} from "../lisp";
import {createContext, createDebugContext} from "../interpreter/context";
import {std} from "../interpreter/functions";
import {compile} from "../interpreter/functions/compile";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const repl = (opt: any) => {

    const interpret = buildInterpreter(compilableCreators)


    //const context = createDebugContext({
    const context = createContext({
        ...std,
        compile: compile(interpret)
    })


    const log = (s) => {
        console.log(s)
    }

    const cb = (str) => {
        interpret(str)(context)
            .then((r) => {
                    log(r);
                    rl.question(">>", cb)
                }
            )
            .catch((e) => e.message)
    }

    rl.question(">>", cb)
}


repl({})
