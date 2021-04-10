import {expect} from "chai";
import {createContext} from "./context";

describe("context", () => {
    it("should return undefined when has no value", () => {

        const context = createContext({value: 33}, null)
        expect(context("@value")).to.be.undefined;
    })

    it("should be able to get value", () => {

        const context = createContext({value: 33}, null)
        expect(context("value")).to.eq(33)

    })

    it("should be able to get value from parent context", () => {

        const context = createContext({}, null)
        const innerContext = createContext({value: 34}, context)
        expect(innerContext("value")).to.eq(34)

    })

})
