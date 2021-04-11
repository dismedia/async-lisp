import {Compileable} from "../domain";

export type Lexer=(string)=>Compileable


export interface CompilableCreators {


    listCreator:(a:any)=>any;
    primitiveCreator:(a:any)=>any;
    identifierCreator:(a:any)=>any;


}
