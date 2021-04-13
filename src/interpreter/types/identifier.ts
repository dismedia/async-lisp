import {TypeCreator} from "./domain";
import {Identifier} from "../../domain";


export const createIdentifier: TypeCreator<Identifier> = (value) =>async (context) => {

    //console.log(`getting identifier:${value} -> ${!!context(value)}`)
    const result= await Promise.resolve(context(value))


    return result;


}
