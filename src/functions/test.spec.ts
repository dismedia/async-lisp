import {createContext} from "../context";
import {add} from "./add";
import {createList} from "../types/list";
import {createIdentifier} from "../types/identifier";
import {createPrimitive} from "../types/primitive";
import {expect} from "chai";
import {eq} from "./eq";
import {iff} from "./if";

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

    it.only("should be able to handle conditions (primitive casting))", async () => {

        const context = createContext({iff})
        const resultTrue = await createList([createIdentifier("iff"), createPrimitive(1),createPrimitive(10),createPrimitive(20) ])(context)
        const resultFalse = await createList([createIdentifier("iff"), createPrimitive(0),createPrimitive(10),createPrimitive(20) ])(context)

        expect([resultTrue,resultFalse]).to.eql([10,20])

    })
});
