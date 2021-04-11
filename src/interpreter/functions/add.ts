import {FunctionDef} from "./domain";


export const add: FunctionDef = (...elements) => async (context) => {


    const components = await Promise.all(elements.map(e => e(context)));



    return components.reduce((a, v) => (a as number) + (v as number), 0)
}
