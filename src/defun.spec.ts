import {interpret} from "./lisp";
import {createContext, createDebugContext} from "./interpreter/context";
import {iff} from "./interpreter/functions/if";
import {eq, lte} from "./interpreter/functions/compare";
import {Plain} from "./domain";
import {expect} from "chai";
import {defun} from "./interpreter/functions/defun";
import {add} from "./interpreter/functions/add";

describe("defun", () => {


    it("define end execute function", async () => {

        const result1 = await interpret(`(defun F (x) x ( F ((add 6 -1)) ))`)(createContext({
            add,
            defun,

        }))

        expect(result1).to.eql(5)
    });


    it("define end execute function", async () => {

        const result1 = await interpret(`(defun F (x y) (y x y x ) (F (88 14)))`)(createContext({
            defun,
        }))


        expect(result1).to.eql([14, 88, 14, 88])
    });


    it("define end execute function with add ", async () => {

        const result1 = await interpret(`(defun F (x y) (add y x y x 1) (F (88 14)))`)(createContext({
            add,
            defun,
        }))


        expect(result1).to.eql(2 * 14 + 2 * 88 + 1)
    });


    it("fib", async () => {

        const fibN = 10;


        const fib = (n: number) => {
            if (n <= 1) return 1;

            return fib(n - 1) + fib(n - 2);
        }
        const fResult = fib(fibN);

        const result1 = await interpret(`
        (
            defun fib (x) 
                (iff (lte x 1) 
                    1 
                    (add (fib(add -1 x)) (fib(add -2 x)))
                ) 
            (fib fibN)
        )
        `)
            //(createDebugContext({
            (createContext({
                add,
                iff,
                eq,
                lte,
                defun,
                fibN
            }))

        expect(result1).to.eql(fResult)
    });


});
