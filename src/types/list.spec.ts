import {expect} from "chai";
import {createList} from "./list";
import {createPrimitive} from "./primitive";

describe("list", () => {
    it("sholud compile to array", async () => {

        const list = createList([
            createPrimitive(3),
            createPrimitive("."),
            createPrimitive(14),
            createPrimitive(15),
        ])


        const result = await list(null)

        expect(result).to.eql([[3, '.', 14, 15]])

    })

    it("sholud compile to nested arrays", async () => {

        const list = createList([
            createPrimitive("foo"),
            createList([
                createPrimitive(45),
                createList([
                    createPrimitive("zero"),
                    createPrimitive("is"),
                    createPrimitive("nested"),
                    createPrimitive(0)
                ])
            ])
        ])


        const result = await list(null)

        expect(result).to.eql([
                "foo", [
                    45,
                    [
                        "zero",
                        "is",
                        "nested",
                        0
                    ]
                ]
            ]
        )

    })
})
