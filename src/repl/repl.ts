import * as  nodeReadline from "readline";
import {Interperter} from "../lexer/domain";
import {compilableCreators} from "../interpreter/compilableCreators";
import {buildInterpreter} from "../lisp";
import {createContext, createDebugContext} from "../interpreter/context";
import {std} from "../interpreter/functions";
import {compile} from "../interpreter/functions/compile";
import {InputSource} from "../domain";
import {readline} from "../interpreter/functions/readline";
import { createReadlineInputSource } from "./inputSource";





const repl = async (opt: {
    inputSource:InputSource
}) => {

    const {inputSource} =opt;

    const interpret = buildInterpreter(compilableCreators)

    //const context = createDebugContext({
    const context = createContext({
        ...std,
        compile: compile(interpret),
        readline:readline(inputSource)
    })


    while (true) {

        const exp = await inputSource.ask(">") as string;
        if(exp=="!") {
            inputSource.close();
            return;
        }
        const result = await interpret(exp)(context);

        console.log(result)
    }


    // const log = (s) => {
    //     console.log(s)
    // }
    //
    // const cb = (str) => {
    //
    //     interpret(str)(context)
    //         .then((r) => {
    //                 //log(r);
    //                 rl.close()
    //                 rl.question(">>", cb)
    //             }
    //         )
    //         .catch((e) => e.message)
    // }
    //
    // rl.question(">>", cb)
}


repl({
    inputSource:createReadlineInputSource()
})


















