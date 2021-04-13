import {FunctionDef} from "./domain";
import {Compilable, Plain} from "../../domain";
import axios from "axios";
import {createContext} from "../context";


export const httpGet: FunctionDef = (...elements) => async (context) => {

    const url = await elements[0](context) as string;

    const resposne = await axios.get(url);


    //lambda style
    const params = await elements[1](context, async (input: Compilable[]) => {

        const collectedValues = [];
        for (let i = 0; i < input.length; i++) {
            //(lambda ((->x ->y) (x y)) //compile params overrride
            const name = await input[i](id=>id)
            collectedValues.push(name as string)
        }

        return collectedValues as string[];

    }) as string[]


    const respArray=[resposne.status,resposne.data,resposne.statusText]

    const scope=params.reduce((a,v,i)=>{

        a[params[i]]=respArray[i]
        return a

    },{})



    return elements[2](createContext(scope, context))

}
