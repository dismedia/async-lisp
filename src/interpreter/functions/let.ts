import {FunctionDef} from "./domain";
import {createContext} from "../context";


export const lett: FunctionDef = (...elements) => async (context) => {

    const varDefElements: any = await elements[0]((id) => {
        const valueFromContext = context(id)
        return {
            variableName: id,
            valueFromContext
        }
    });

    const scope = varDefElements.reduce((a, v) => {
        a[v[0].variableName] = v[1].valueFromContext || v[1]; //identifier (from scope) || plain value
        return a;
    }, {})

    return await elements[elements.length - 1](createContext(scope, context))

}
