import {Compileable, Context, Plain} from "../domain";

export type FunctionDef = (...params: Compileable[]) => (context: Context) =>Promise<Plain>
