import {TypeCreator} from "./domain";
import {Compileable, Plain} from "../domain";


export const createList: TypeCreator<Compileable[]> = (value) => async (context) => {

    const result = await Promise.all(value.map(e => e(context)))
    const a = result as Array<any>


    return (a.length && a.length > 0 && typeof a[0] === 'function') ? handleExecution(result, context) : result

}


const handleExecution = (arr: any[], context) => {



    const [f, ...params] = arr;

    return f(...params)


}
