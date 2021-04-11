import {TypeCreator} from "./domain";
import {Compilable} from "../../domain";

export const createList: TypeCreator<Compilable[]> = (input) => async (context, override) => {

    if (override && typeof override == "function") {
        return await override(input) as any
    }

    const [first, ...rest] = input

    const firstEvaluated = await first(context)

    return (typeof firstEvaluated === 'function') ? handleExecution(firstEvaluated, rest, context) :
        Promise.all([
            Promise.resolve(firstEvaluated), //mimic resolving
            ...rest.map(e => e(context))
        ])

}


const handleExecution = (f: any, params: Compilable[], context) => {

    //console.log('executing with', f, params)
    return f(...params)(context)


}
