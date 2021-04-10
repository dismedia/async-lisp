import {createIdentifier} from "./identifier";
import {createContext} from "../context";

import {expect} from "chai";

describe("identifier", () => {
    it("sholud be able get value from context", async () => {


        const value = "[1]"
        const context = createContext({value1: value})

        const v = await createIdentifier("value1")(context)

        expect(v).to.eql(value)


    });


})
