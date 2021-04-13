import {FunctionDef} from "./domain";
import {createContext} from "../context";
import {Compilable} from "../../domain";

export const lambda: FunctionDef = (...elements) => async (context) => {

    let g = 0;

    //(lambda (->(x y) (x y)) //compile params overrride
    const params = await elements[0](context, async (input: Compilable[]) => {

        const collectedValues = [];
        for (let i = 0; i < input.length; i++) {
            //(lambda ((->x ->y) (x y)) //compile params overrride
            const name = await input[i](id=>id)
            collectedValues.push(name as string)
        }

        return collectedValues as string[];

    }) as string[]

    //console.log(params)

    return ((args) => async (context) => {

        const resolvedArg=await args(context);

        const scope = params.reduce((a, v, i) => {
            a[v] = resolvedArg[i]
            return a

        }, {})

        //(lambda ((x y) ->(x y)) //execute
        return await elements[1](createContext(scope, context))

    }) as any;
}
