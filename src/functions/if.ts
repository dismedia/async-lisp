import {FunctionDef} from "./domain";

export const iff: FunctionDef = (...elements) => async (context) => {

    const condition = await elements[0](context);



    return !!condition ? await elements[1](context) : await elements[2](context)

}
