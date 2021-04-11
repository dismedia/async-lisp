import {TypeCreator} from "./domain";
import {Compileable, Plain} from "../domain";


export const createList: TypeCreator<Compileable[]> = (value) => async (context) => {


    const [first, ...rest] = value

    const firstEvaluated = await first(context)

    return (typeof firstEvaluated === 'function') ? handleExecution(firstEvaluated,rest, context) :
        Promise.all([
            Promise.resolve(firstEvaluated), //mimic resolving
            ...rest.map(e => e(context))
        ])

}


const handleExecution = (f:any,params: Compileable[], context) => {


    console.log('executing with', f,params)
    return f(...params)(context)


}
