import {FunctionDef} from "./domain";
import {Compilable, Plain} from "../../domain";

export const headLazy: FunctionDef = (...elements) => async (context) => {

    return await elements[0](context, async (input) => {
        return await input[0](context)
    })

}

export const head: FunctionDef = (...elements) => async (context) => {

    const result = await elements[0](context) as Plain[];
    const [h, ...t] = result;
    return h;

}


export const tailLazy: FunctionDef = (...elements) => async (context) => {

    //do not evaluate head

    return await elements[0](context, async (input: Compilable[]) => {
        const [, ...tailEl] = input
        return Promise.all(tailEl.map(e => e(context)))
    })

}

export const tail: FunctionDef = (...elements) => async (context) => {

    const result = await elements[0](context) as Plain[];
    const [h, ...t] = result;
    return t;
}

export const pick: FunctionDef = (...elements) => async (context) => {

    return await elements[0](context, async (input) => {
        let index = input[0](context);
        return await elements[index](context);

    })

}


export const clist: FunctionDef = (...elements) => async (context) => {
    return elements.length === 0 ? [] : await Promise.all(elements.map(e => e(context)))
}


export const cons: FunctionDef = (...elements) => async (context) => {

    const head =await elements[0](context);
    const tail= await elements[1](context) as Plain[];
    return (Array.isArray(tail)) ? [head,...tail] : [head,tail]

}

