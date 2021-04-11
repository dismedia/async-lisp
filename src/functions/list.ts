//export const list=
import {FunctionDef} from "./domain";
import {Plain} from "../domain";

export const head: FunctionDef = (...elements) => async (context) => {

    return await elements[0](context, async (input) => {
        return input[0](context)
    })


}


export const tail: FunctionDef = (...elements) => async (context) => {


    return await elements[0](context, async (input) => {
        return input[0](context)
    })


    const list = Promise.all(elements.slice(1).map(e=>e(context)))

    return list;

}
