import {expect} from "chai";
import {createContext} from "./interpreter/context";
import {buildInterpreter, interpret} from "./lisp";
import {compilableCreatorsVerbose} from "./interpreter/compilableCreators";
import {add, sumArray} from "./interpreter/functions/add";
import {eq} from "./interpreter/functions/eq";
import {lett} from "./interpreter/functions/let";
import {head} from "./interpreter/functions/list";


describe("lisp", () => {
    it("atom/primitive number", async () => {

        const result = await buildInterpreter(compilableCreatorsVerbose)(`1`)(createContext())
        //const result=await interpret(`1`)(createContext())
        expect(result).to.eql(1);

    })

    it("atom/primitive string", async () => {

        //const result =await buildInterpreter(compilableCreatorsVerbose)('"lisp"')(createContext)
        const result = await interpret(`"lisp"`)(createContext())

        expect(result).to.eql("lisp");


    })

    it("list", async () => {

        const result = await interpret(`()`)(createContext())
        expect(result).to.eql([]);

    })

    it("list with atoms", async () => {

        const result = await interpret(`(8 9 "c")`)(createContext())
        //const result = await buildInterpreter(compilableCreatorsVerbose)(`(7 9 "c")`)(createContext())
        expect(result).to.eql([8, 9, "c"]);
    })

    it("list with list", async () => {
        const result = await interpret(`((8 9) "c" ("a" ("foo" "bar")))`)(createContext())
        //const result = await buildInterpreter(compilableCreatorsVerbose)(`(7 9 "c")`)(createContext())
        expect(result).to.eql([[8, 9], "c", ["a", ["foo", "bar"]]]);
    })


    it("identifier", async () => {

        const result = await interpret(`(a c b)`)(createContext({a: "aa", b: 1, c: 2}))
        expect(result).to.eql(["aa", 2, 1]);


    })


    it("add", async () => {

        const result1 = await interpret(`(add 1 20)`)(createContext({add}))
        expect(result1).to.eql(21);

        const result2 = await interpret(`(add 1 four 5 (add (add 3 3 3) (add 10 1)) 2)`)(createContext({add, four: 4}))
        expect(result2).to.eql(32);


        const result3 = await interpret(`( 4 ( add 1 20) (add 30 10))`)(createContext({add}))
        expect(result3).to.eql([4, 21, 40]);


    })

    it("eq", async () => {

        const result1 = await interpret(`(eq 1 20)`)(createContext({eq}))
        expect(result1).to.eql(false);

        const result2 = await interpret(`(eq 20 20)`)(createContext({eq}))
        expect(result2).to.eql(true);

        const result3 = await interpret(`(eq "a" "a")`)(createContext({eq}))
        expect(result3).to.eql(true);

        const result4 = await interpret(`(eq "a" "b")`)(createContext({eq}))
        expect(result4).to.eql(false);


        const result5 = await interpret(`(eq "1" 1)`)(createContext({eq}))
        expect(result5).to.eql(false);
    })

    it("lett", async () => {
        const result1 = await interpret(`(lett ((x 55) (y 44)) ( x y "bar"))`)(createContext({
            lett,
        }))
        expect(result1).to.eql([55, 44, "bar"]);
    })
    it("lett", async () => {
        const result2 = await interpret(`(lett ((x 0) (y 1) ( z 77)) (x y z (add x y z)))`)(createContext({
            lett,
            add
        }))
        expect(result2).to.eql([0, 1, 77, 78]);
    })
    it("lett", async () => {

        const result3 = await interpret(`(
         lett ((x 55 ) (y 45)) ( ( add y x) "bar")
            )`)(createContext({
            lett, add
        }))

        expect(result3).to.eql([100, "bar"])
    })
    it("lett", async () => {
        const result4 = await interpret(`(
         lett ((x (add 55 33) ) (y (add 1 4))) (x y (add x y)) )`)(createContext({
            lett, add
        }))

        expect(result4).to.eql([88, 5, 93])
    })
    it("lett", async () => {

        const result5 = await interpret(`(
         lett ((x 1)) x )`)(createContext({
            lett, add
        }))
        expect(result5).to.eql(1)

    })
    it("lett", async () => {
        const result6 = await interpret(`(lett ((x 7)) (lett ((y 4)) (y x (add y x) )))`)(createContext({
            lett, add
        }))

        expect(result6).to.eql([4, 7, 11])
    })
    it("lett", async () => {

        const result7 = await interpret(`(lett ((x 7)) (lett ((y x)) (y x (add y x) )))`)(createContext({
            lett, add
        }))

        expect(result7).to.eql([7, 7, 14])
    })
    it("lett", async () => {

        const result8 = await interpret(`(lett ((x (1 2))) (lett ((y x)) (y x)))`)(createContext({
            lett, add
        }))

        expect(result8).to.eql([[1, 2], [1, 2]])
    })
    it("lett", async () => {

        const result9 = await interpret(`(lett ((x (1 2 100))) (sumArray x))`)(createContext({
            lett, sumArray, head
        }))

        expect(result9).to.eql(103)


    })

});
//await new Promise(resolve => setTimeout(resolve, 100))
