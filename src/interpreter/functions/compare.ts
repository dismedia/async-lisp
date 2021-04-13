import {FunctionDef} from "./domain";
import {Plain} from "../../domain";


export const eq: FunctionDef = (...elements) => async (context) => {

    const components = await Promise.all(elements.map(e => e(context)));
    return components.every(k => k === components[0]) as any as Plain


}


export const gt: FunctionDef = (...elements) => async (context) => {

    const a = await elements[0](context);
    const b = await elements[1](context);

    return a > b

}


export const gte: FunctionDef = (...elements) => async (context) => {

    const a = await elements[0](context);
    const b = await elements[1](context);

    return a >= b

}


export const lt: FunctionDef = (...elements) => async (context) => {

    const a = await elements[0](context);
    const b = await elements[1](context);

    return a < b

}


export const lte: FunctionDef = (...elements) => async (context) => {

    const a = await elements[0](context);
    const b = await elements[1](context);

    return a <= b

}
