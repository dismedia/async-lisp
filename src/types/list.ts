import {TypeCreator} from "./domain";
import {Compileable, Plain} from "../domain";


export const createList: TypeCreator<Compileable[]> = (value) => (context) => {


    const g: Promise<Plain | Plain[]> =value[0](context)
    const g1: Promise<Plain | Plain[]> =value[0](context)

    //const all: Promise<[(string | number | Plain[]), (string | number | Plain[])]> =Promise.all([value[0](context),value[0](context)])
    return Promise.all(value.map(e=>e(context)))

}
