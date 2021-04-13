import {FunctionDef} from "./domain";
import {Compilable} from "../../domain";
import {createContext} from "../context";


export const defun: FunctionDef = (...elements) => async (context) => {



    //(defun ->myfun (x y) (y x) ( myfun(a b)))

    const funcName=await elements[0]((id)=>id); // do no resolve function name use identifier

    //(defun myfun ->(x y) (y x) ( myfun(a b)))
    const params = await elements[1](context, async (input: Compilable[]) => {
        const collectedValues = [];
        for (let i = 0; i < input.length; i++) {
            //(defun myfun (->x ->y) (y x) ( myfun(a b)))
            const name = await input[i](id=>id)
            collectedValues.push(name as string)
        }

        return collectedValues as string[];

    }) as string[]

    //console.log(params)




    const impl= ((args) => async (context) => {

        const resolvedArg=await args(context);

        const scope = params.reduce((a, v, i) => {
            a[v] = resolvedArg[i]|resolvedArg
            return a

        }, {})

        //(defun myfun (x y) ->(y x) ( myfun(a b)))
        //func name should be visible in this context, cause
        //this context will be ultimatelly created from @
        return await elements[2](createContext(scope, context))

    }) as any;



    //@ this context
    //(defun myfun (x y) (y x) ->(myfun(a b)))
    return await elements[3](createContext({[funcName.toString()]: impl},context))



}
