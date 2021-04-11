import { expect } from "chai";
import {createPrimitive} from "./primitive";

describe("primitive",()=>{
    it("sholud compile to raw data",async ()=>{

        const foo=await createPrimitive("foo")(null)
        expect(foo).to.eq("foo")


        const n44=await createPrimitive(44)(null)
        expect(n44).to.eq(44)


    })
})
