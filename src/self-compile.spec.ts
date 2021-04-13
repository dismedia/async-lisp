import {interpret} from "./lisp";
import {createContext} from "./interpreter/context";
import {lett} from "./interpreter/functions/let";
import {add} from "./interpreter/functions/add";
import {expect} from "chai";
import {compile} from "./interpreter/functions/compile";

describe("self compile", () => {
    it("compile from scope source", async () => {


        const result = await interpret(`("bar" (compile source)) )`)(createContext({
            //injecting interpreter into function
            compile: compile(interpret),
            //add source to scope
            source: `(3 5 "foo")`
        }))

        expect(result).to.eql([["bar", [3, 5, "foo"]]])

    })

    it.only("compile from scope source using value from let", async () => {


        const result = await interpret(`(lett ((x 9) (y 4) (z 1000 ))(compile source))`)(createContext({
            lett,add,
            //injecting interpreter into compile function
            compile: compile(interpret),
            //add source to scope, to prevent lexer messing with it
            source: `(add x y (compile innerSource))`,
            innerSource:'(add z z )'
        }))



        expect(result).to.eql(2013)
    })
});
