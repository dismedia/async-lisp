import {FunctionDef} from "./domain";
import {Plain} from "../../domain";


export const add: FunctionDef = (...elements) => async (context) => {

    const components = await Promise.all(elements.map(e => e(context)));
    return components.reduce((a, v) => (a as number) + (v as number), 0)
    //confusing casting, someday
}


export const sumArray: FunctionDef = (...elements) => async (context) => {

    const components = await elements[0](context) as Plain[];
    return components.reduce((a, v) => (a as number) + (v as number), 0)

}


export const div: FunctionDef = (...elements) => async (context)=>{

    const a = await elements[0](context) as number;
    const b = await elements[0](context) as number;

    return Math.floor(a / b)


}
