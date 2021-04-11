import {TypeCreator} from "./domain";
import {Compileable, Identifier} from "../domain";

export const createIdentifier: TypeCreator<Identifier> = (value) => (context) => {

    console.log(`getting identifier:${value} -> ${!!context(value)}`)
    return Promise.resolve(context(value))

}
