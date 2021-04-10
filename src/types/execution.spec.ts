import {createContext} from "../context";
import {createList} from "./list";
import {createIdentifier} from "./identifier";
import {createPrimitive} from "./primitive";
import {expect} from "chai";

describe("function execution", () => {
    it("should execute when encounter a function", (done) => {


        const context = createContext({
            f1: (param) => {
                expect(param).to.eql("foo")
                done()
            }
        })


        createList([createIdentifier("f1"), createPrimitive("foo")])(context);


    })
})
