import {TypeCreator} from "./domain";
import {Compileable, Identifier} from "../domain";

export const createIdentifier: TypeCreator<Identifier> = (value) => (context) => {

    console.log("geting identifier")
    return Promise.resolve(context(value))

}
