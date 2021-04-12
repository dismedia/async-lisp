import {CompilableCreators, Interperter} from "./lexer/domain";
import {compilableCreators} from "./interpreter/compilableCreators";
import {analyze, clean, parse} from "./lexer/lexer";

export const buildInterpreter: (cc: CompilableCreators) => Interperter = (cc) => (str) =>
    parse(analyze(clean(str)),cc)

export const interpret:Interperter=buildInterpreter(compilableCreators)

