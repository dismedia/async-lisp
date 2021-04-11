import {CompilableCreators, Lexer} from "./domain";
import {Compilable} from "../domain";


export const createLexer: (cc: CompilableCreators) => Lexer = (cc) => (str) =>
    parse(analyze(clean(str)),cc)

export const clean = (input: string) =>
    input.split('"')
        .map((x, i) => (i % 2 === 0) ?
            x.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ') :
            x.replace(/ /g, "$ws")
        )
        .join('"')
        .trim()
        .split(/\s+/)
        .map(function (x) {
            return x.replace(/$ws/g, " ");
        });


export const analyze = (input, list = []) => {
    var token = input.shift();
    if (token === undefined) {
        return list.pop();
    } else if (token === "(") {
        list.push(analyze(input, []));
        return analyze(input, list);
    } else if (token === ")") {
        return list;
    } else {
        return analyze(input, [...list, token]);
    }
};

export const parse: (input, cc: CompilableCreators) => Compilable = (input, cc: CompilableCreators) => {
    if (!isNaN(parseFloat(input))) return cc.primitiveCreator(input)
    if (input[0] === "'") return cc.primitiveCreator(input.slice(1, -1))
    if (Array.isArray(input)) return cc.listCreator(input.map(e => parse(e, cc)))

    return cc.identifierCreator(input)


}
