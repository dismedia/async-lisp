import {FunctionDef} from "./domain";
import {createContext} from "../context";

export const lambda: FunctionDef = (...elements) => async (context) => {

    return ((args) => async (context) => {

        //resolver args
        const resolvedArgs = await args(e => e)


        const varDefElements: any = await elements[0]((id) => {
            const valueFromContext = context(id)
            return {
                variableName: id,
                valueFromContext
            }
        });

        const scope = varDefElements.reduce((a, v, i) => {

            a[varDefElements[i].variableName] = resolvedArgs[i]
            return a;

        }, {})

        //execute
        return await elements[1](createContext(scope, context))

    }) as any;
}
