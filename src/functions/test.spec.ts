import {createContext} from "../context";
import {add} from "./add";
import {createList} from "../types/list";
import {createIdentifier} from "../types/identifier";
import {createPrimitive} from "../types/primitive";
import {expect} from "chai";
import {eq} from "./eq";
import {iff} from "./if";
import {lett} from "./let";
import {lambda} from "./lambda";
import {delay} from "./async";
import {head, tail} from "./list";


describe("functions", () => {
    it("should add", async () => {

        const context = createContext({add})
        const result = await createList([createIdentifier("add"), ...[1, 2, 3, -4].map(e => createPrimitive(e))])(context)
        expect(result).to.eq(2)

    })

    it("should add with scope values", async () => {

        const context = createContext({add, one: 1, two: 2, three: 3})
        const result = await createList([createIdentifier("add"), ...["one", "two", "three"].map(e => createIdentifier(e))])(context)
        expect(result).to.eq(6)

    })

    it("should be able to tell if eqal (primitive or ref, no casting allowed )", async () => {

        const context = createContext({eq})
        const resultTrue1 = await createList([createIdentifier("eq"), ...[1, 1].map(e => createPrimitive(e))])(context)
        const resultTrue2 = await createList([createIdentifier("eq"), ...["a", "a"].map(e => createPrimitive(e))])(context)


        expect(resultTrue1 && resultTrue2).to.eq(true)


        const resultFalse1 = await createList([createIdentifier("eq"), ...["a", "b"].map(e => createPrimitive(e))])(context)
        const resultFalse2 = await createList([createIdentifier("eq"), ...[0, 1].map(e => createPrimitive(e))])(context)
        const resultFalse3 = await createList([createIdentifier("eq"), ...[0, "0"].map(e => createPrimitive(e))])(context)

        expect(resultFalse1 || resultFalse2 || resultFalse3).to.eq(false)


    })

    it("should be able to handle conditions (primitive casting))", async () => {

        const context = createContext({iff})
        const resultTrue = await createList([createIdentifier("iff"), createPrimitive(1), createPrimitive(10), createPrimitive(20)])(context)
        const resultFalse = await createList([createIdentifier("iff"), createPrimitive(0), createPrimitive(10), createPrimitive(20)])(context)

        expect([resultTrue, resultFalse]).to.eql([10, 20])

    })



    describe("lett", () => {

        it("sholud be able to add value to scope", async () => {

            const context = createContext({lett});

            const result = await createList(
                [
                    createIdentifier("lett"),
                    createList([
                        createList([createIdentifier("x"), createPrimitive("foo")]),
                        createList([createIdentifier("y"), createPrimitive("bar")]),
                        createList([createIdentifier("z"), createPrimitive(0)]),]),

                    createList([createIdentifier("z"), createIdentifier("y"), createIdentifier("x")]),
                ])

            (context)

            expect(result).to.eql([0, "bar", "foo"])
        })

        it("sholud be able to add scope value to inner scope", async () => {

            const context = createContext({lett, foo: "bar!"});

            const result = await createList(
                [
                    createIdentifier("lett"),
                    createList([
                        createList([createIdentifier("x"), createPrimitive("hello")]),
                        createList([createIdentifier("y"), createIdentifier("foo")]) //from scope
                    ]),
                    createList([createIdentifier("x"), createIdentifier("y")]),
                ])

            (context)

            expect(result).to.eql(['hello', 'bar!'])
        })


    })

    describe("lambda", () => {

        it("sholud be able to execute", async () => {

            const context = createContext({lambda});

            const result = await createList(
                [

                    createList([
                        createIdentifier("lambda"),
                        createList([createIdentifier("x"), createIdentifier("yz")]),
                        createList([createPrimitive(0), createIdentifier("x"), createIdentifier("yz")]),
                    ]),
                    createList([createPrimitive(1), createList(
                        [createPrimitive(2), createPrimitive(3)]
                    )])
                ])

            (context)

            expect(result).to.eql([0, 1, [2, 3]])


        })
        it("sholud be able to execute using arithmetic", async () => {

            const context = createContext({lambda, add});

            const result = await createList(
                [

                    createList([
                        createIdentifier("lambda"),
                        createList([createIdentifier("x"), createIdentifier("y")]),
                        createList([createIdentifier("add"), createPrimitive(3), createIdentifier("x"), createIdentifier("y")]),
                    ]),
                    createList([createPrimitive(1), createPrimitive(9)])
                ])

            (context)

            expect(result).to.eql(13)


        })

    })

    describe("list op", () => {
        it("sholud be able to get head", async () => {

            const context = createContext({head});

            const result = await createList([
                createIdentifier("head"),
                createList([
                    createPrimitive(1),
                    createPrimitive(2),
                    createPrimitive(3),
                ]),
            ])(context)

            expect(result).to.eql(1)

        })

        it("sholud be able to get tail", async () => {


            const context = createContext({tail});

            const result = await createList([
                createIdentifier("tail"),
                createList([
                    createPrimitive(1),
                    createPrimitive(2),
                    createPrimitive(3),
                ]),
            ])(context)

            expect(result).to.eql([2, 3])

        })


    });


    describe("parallel execution", () => {
        it("sholud be able execute async", async () => {


            const context = createContext({add, delay, six: 6, interval: 100});

            const result = await createList([
                createIdentifier("add"),
                createPrimitive(3),
                createList([createIdentifier("delay"), createPrimitive("Four"), createPrimitive(10), createPrimitive(100), createPrimitive(4)]),
                createList([createIdentifier("delay"), createPrimitive("Five"), createPrimitive(10), createIdentifier("interval"), createPrimitive(5)]),
                createIdentifier("six"),
            ])(context)

            expect(result).to.eql(18)

        })
    });


});
