import {FunctionDef} from "./domain";
import {createContext} from "../context";
import {Compilable, Plain} from "../../domain";


export const lett: FunctionDef = (...elements) => async (context) => {

    //compilaton override, we dont want recurrent compilation of list here.
    //it is specific on every levels:

    // (let ->((x 0)(y 1)) (x y))  compile params list
    const scope=await elements[0](context,async (input:Compilable[])=>{

        const collectedValues={};

        for(let i=0;i<input.length;i++){
            const declaration:any=await input[i](context,async (input: [Compilable, Compilable]) => {

                    //(let ((->x 0) (->y 1)) (x y)) compile variable tuple but do not try to resolve identifier
                    const name = await input[0]((id) => id)
                    //(let ((x ->0) (y ->1)) (x y)) compile variable value like anything else
                    const value = await input[1](context);

                    //console.log(name,value)
                    return ({name,value}) as any

                })
                collectedValues[declaration.name]=declaration.value

            }
            return collectedValues as any;
        })

    return await elements[elements.length - 1](createContext(scope, context))

}
