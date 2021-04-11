import {FunctionDef} from "./domain";
import {Plain} from "../domain";

export const eq: FunctionDef = (...elements) => async (context) => {

    const components = await Promise.all(elements.map(e => e(context)));
    return components.every(k => k === components[0]) as any as Plain


}
