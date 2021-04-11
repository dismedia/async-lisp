import {Compilable, Context, Plain} from "../../domain";


export type FunctionDef = (...params: Compilable[]) => (context: Context) =>Promise<Plain>
