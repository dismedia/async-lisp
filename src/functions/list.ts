//export const list=
import {FunctionDef} from "./domain";
import {Compileable, Plain} from "../domain";

export const head: FunctionDef = (...elements) => async (context) => {

    return await elements[0](context, async (input) => {
        return input[0](context)
    })


}


export const tail: FunctionDef = (...elements) => async (context) => {

    return await elements[0](context, async (input: Compileable[]) => {
        const [h, ...tailEl] = input
        //return Promise.all([input[1](context)])
        return Promise.all(tailEl.map(e => e(context)))
    })


}
