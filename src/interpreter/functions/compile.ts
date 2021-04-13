import {FunctionDef} from "./domain";
import {Plain} from "../../domain";

export const compile: (interpreter)=>FunctionDef =(interpreter)=> (...elements) => async (context) => {

    const str = await elements[0](context)
    return await interpreter(str)(context)


}
