import {CompilableCreators, Interperter} from "./domain";
import {Compilable} from "../domain";


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

    // console.log("input ",input);
    // console.log("arr",Array.isArray(input));
    //
    if(Array.isArray(input)){
        console.log("len",input.length);
        console.log("map",input.map(e => parse(e, cc)));
    }


    if (Array.isArray(input)) return cc.listCreator(input.map(e => parse(e, cc)))
    const n = parseFloat(input)
    if (!isNaN(n)) return cc.primitiveCreator(n)
    if (input[0] && input[0].charCodeAt(0) == 34) return cc.primitiveCreator(input.slice(1, -1))




    return cc.identifierCreator(input)


}
