import {CompilableCreators} from "../lexer/domain";
import {createList} from "./types/list";
import {createIdentifier} from "./types/identifier";
import {createPrimitive} from "./types/primitive";


export const compilableCreators: CompilableCreators = {

    listCreator: createList,
    identifierCreator: createIdentifier,
    primitiveCreator: createPrimitive


}


export const compilableCreatorsVerbose: CompilableCreators = {

    listCreator: (input) => {
        console.log("creating list ", input);
        return createList(input)
    },
    identifierCreator: (input) => {
        console.log("creating identifier ", input);
        return createIdentifier(input)
    },
    primitiveCreator: (input) => {
        console.log("creating primitive ", input);
        return createPrimitive(input)
    }


}
