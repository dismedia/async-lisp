import {FunctionDef} from "./domain";
import {Compilable} from "../../domain";

export const head: FunctionDef = (...elements) => async (context) => {

    return await elements[0](context, async (input) => {
        return input[0](context)
    })

}


export const tail: FunctionDef = (...elements) => async (context) => {

    return await elements[0](context, async (input: Compilable[]) => {
        const [, ...tailEl] = input
        return Promise.all(tailEl.map(e => e(context)))
    })


}
