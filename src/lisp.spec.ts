import {expect} from "chai";
import {createContext} from "./interpreter/context";
import {buildInterpreter, interpret} from "./lisp";
import {compilableCreatorsVerbose} from "./interpreter/compilableCreators";
import {add, sumArray} from "./interpreter/functions/add";
import {eq} from "./interpreter/functions/compare";
import {lett} from "./interpreter/functions/let";
import {head, headLazy, tail, tailLazy} from "./interpreter/functions/list-op";
import {httpGet} from "./interpreter/functions/http";
import {lambda} from "./interpreter/functions/lambda";
import {compile} from "./interpreter/functions/compile";
import {iff} from "./interpreter/functions/if";
import {Plain} from "./domain";


describe("lisp", () => {
    it("atom/primitive number", async () => {

        //const result = await buildInterpreter(compilableCreatorsVerbose)(`1`)(createContext())
        const result = await interpret(`1`)(createContext())

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


    describe("lisp op", () => {
        it("extract head", async () => {

            //x is undefined but, not evaluated
            const result = await interpret(`(headLazy ((add 90 9) 4 x))`)(createContext({headLazy, add}))
            expect(result).to.eql(99);

        })

        it("extract tail / lazy", async () => {

            //x is undefined but, not evaluated
            const result = await interpret(`(tailLazy (x 99 4))`)(createContext({tailLazy}))
            expect(result).to.eql([99, 4]);

        })

        it("extract head from tail ", async () => {
            const result1 = await interpret(`(head(tail((0 0) (99 5) 0)))`)(createContext({head, tail}))
            expect(result1).to.eql([99, 5]);

            const result2 = await interpret(`(head(head(tail((0 0) (99 5) 0))))`)(createContext({head, tail}))
            expect(result2).to.eql(99);


        })

        it("extract tail from tail / lazy", async () => {

            //x is undefined but, not evaluated
            const result = await interpret(`(tailLazy (x (tailLazy(99 5 4)) ) )`)(createContext({tailLazy}))
            expect(result).to.eql([[5, 4]]);

        })

        it("extract tail from tail", async () => {

            const result = await interpret(`( tail(tail(tail(1 2 3 4)))) )`)(createContext({tail}))
            expect(result).to.eql([[4]]);

        })


    });

    it("add", async () => {

        const result1 = await interpret(`(add 1 20)`)(createContext({add}))
        expect(result1).to.eql(21);

        const result2 = await interpret(`(add 1 four (add (add 3 3 3) (add 10 1)) 2)`)(createContext({add, four: 4}))
        expect(result2).to.eql(1 + 4 + 9 + 11 + 2);

        const result3 = await interpret(`( 4 (add 1 20) (add 30 10))`)(createContext({add}))
        expect(result3).to.eql([4, 21, 40]);

        const result4 = await interpret(`( add  (add 4 1) 4)`)(createContext({add}))
        expect(result4).to.eql(9);


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

        const result6 = await interpret(`(eq a b)`)(createContext({eq, a: 1, b: 1}))
        expect(result6).to.eql(true);

        const result7 = await interpret(`(eq a b)`)(createContext({eq, a: 1, b: 3}))
        expect(result7).to.eql(false);
    })

    it("lett", async () => {


        //(let ((s (add 4 5)) (g 4)) (  s g  ) ) => [1,4]
        //lambda ((a b c) ( a c c c)) (1 2 3) ->[ 1,3,3,3]

        const result1 = await interpret(`(lett((x 55) (y 44))( x y "bar"))`)(createContext({
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


    it("http get", async () => {


        const result = await interpret(`(httpGet url (httpStatus data) (data httpStatus))`)(createContext({
            httpGet,
            //this url returns exactly "(1 2 x)" string
            url: 'https://gist.githubusercontent.com/dismedia/f436e17e9145e7c051d4dfbbbf9f31af/raw/d8bc37909391ca08c1596105e905c76633a69a39/gistfile1.txt'

        }))

        expect(result).to.eql(["(1 2 x)", 200])


    })

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

        it("compile from scope source using value from let", async () => {


            const result = await interpret(`(lett ((x 9) (y 4) (z 1000 ))(compile source))`)(createContext({
                lett, add,
                //injecting interpreter into compile function
                compile: compile(interpret),
                //add source to scope, to prevent lexer messing with it
                source: `(add x y (compile innerSource))`,
                innerSource: '(add z z )'
            }))


            expect(result).to.eql(2013)
        })
    });

    describe("lambda", () => {
        it("execute", async () => {

            const result = await interpret(`((lambda (x y z)(z y x y z))( 1 2 3) )`)(createContext({
                lambda
            }))
            expect(result).to.eql([3, 2, 1, 2, 3])

        })

        it("execute with scope", async () => {

            const result = await interpret(`
            
            (lett ((a 1)(b 2)(c 3)) ((lambda (x y z)(z y x y z))(a b c)) ) 
            
            `)(createContext({
                lambda, lett

            }))

            expect(result).to.eql([3, 2, 1, 2, 3])

        })
    });

    describe("flow controll", () => {
        it("if", async () => {


            const result1 = await interpret(`(iff (eq 10 10) 1 2)`)(createContext({
                iff,
                eq
            }))
            expect(result1).to.eql(1)


            const result2 = await interpret(`(iff (eq 10 11) 1 2)`)(createContext({
                iff,
                eq
            }))
            expect(result2).to.eql(2)

        })

        it("if will not execute other branch", async () => {


            const result1 = await interpret(`(iff (eq 10 10) (willExecuteMock) (willNotExecuteMock))`)(createContext({
                iff,
                eq,
                willExecuteMock: () => () => Promise.resolve("executed" as Plain),
                willNotExecuteMock: () => () => {
                    throw new Error("should not happened")
                }

            }))
            expect(result1).to.eql("executed")


            //not really needed but, making sure that mock throwing error if not equal
            await interpret(`(iff (eq 11 10) (willExecuteMock) (willNotExecuteMock))`)(createContext({
                iff,
                eq,
                willExecuteMock: () => () => Promise.resolve("executed" as Plain),
                willNotExecuteMock: () => () => {
                    throw new Error("should not happened")
                }

            })).catch((e: Error) => {
                expect(e).to.exist;
                console.log(e.message, "..but it happened")
            })


        })

    });


    describe("async import", () => {

        it("should compile remote code", async () => {

            const result = await interpret(`(httpGet url (status source) (compile source))`)(createContext({
                httpGet,
                compile: compile(interpret),
                x: 99,
                //this url should return exactly "(1 2 x)" string
                url: 'https://gist.githubusercontent.com/dismedia/f436e17e9145e7c051d4dfbbbf9f31af/raw/d8bc37909391ca08c1596105e905c76633a69a39/gistfile1.txt'

            }))
            expect(result).to.eql([1, 2, 99])
        })

        it("should compile remote code (executed with x form lett) and execute function on it", async () => {


            const result = await interpret(`(lett ((x 99)) (httpGet url (status source) (sumArray (compile source))) )`)
            (createContext({
                httpGet,
                lett,
                sumArray,
                compile: compile(interpret),

                //this url should return exactly "(1 2 x)" string
                url: 'https://gist.githubusercontent.com/dismedia/f436e17e9145e7c051d4dfbbbf9f31af/raw/d8bc37909391ca08c1596105e905c76633a69a39/gistfile1.txt'

            }))
            expect(result).to.eql(102)
        })

        it('md', async () => {

            const context = createContext({a: "hello"});

            const result = await interpret(`(8 9 "c" a)`)(context)

            expect(result).to.eql([8, 9, "c", "hello"])


            interpret(`(8 9 "c" a)`)(context).then((r) => {
                expect(r).to.eql([8, 9, "c", "hello"])
            })


        });

    });

});
//await new Promise(resolve => setTimeout(resolve, 100))




