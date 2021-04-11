import {Compilable} from "../domain";

export type Lexer=(str:string)=>Compilable


export interface CompilableCreators {


    listCreator:(a:any)=>any;
    primitiveCreator:(a:any)=>any;
    identifierCreator:(a:any)=>any;


}
