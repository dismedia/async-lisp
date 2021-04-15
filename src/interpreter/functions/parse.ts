import {FunctionDef} from "./domain";
import {Plain} from "../../domain";

export const toint: FunctionDef = (...elements) => async (context) => {

    const value  = await elements[0](context) as string
    return parseInt(value) as unknown as number;

}

