import {TypeCreator} from "./domain";

export const createPrimitive: TypeCreator<string | number> = (value) => (context) => Promise.resolve(value)

