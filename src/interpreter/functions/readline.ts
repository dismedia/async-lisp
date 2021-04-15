import {FunctionDef} from "./domain";
import {InputSource, Compilable} from "../../domain";
import {createContext} from "../context";




export const readline: (inputSource:InputSource)=> FunctionDef = (inputSource)=> (...elements) => async (context) => {

    const question = await elements[0](context) as string;

    //lambda with one param
    const param = await elements[1](id=>id)

    const intputValue=await inputSource.ask(question)

   const scope={
        [param as string]:intputValue
   }



    return elements[2](createContext(scope, context))

}

