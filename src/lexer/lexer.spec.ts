import {expect} from "chai";
import {analyze, clean, parse} from "./lexer";


describe("lexer", () => {


    it("case1", () => {
        const input = '9';

        const cleaned = clean(input)
        const analyzed = analyze(cleaned)
        expect(analyzed).to.eql('9')


    });


    it("case2", () => {
        const input = '(9)';

        const cleaned = clean(input)
        const analyzed = analyze(cleaned)
        expect(analyzed).to.eql(['9'])
    });


    it("case3", () => {
        const input = '(9 7)';

        const cleaned = clean(input)
        const analyzed = analyze(cleaned)
        expect(analyzed).to.eql(['9', '7'])
    });


    it("case4", () => {
        const input = `(9 "a" a 7)`;

        const cleaned = clean(input)
        const analyzed = analyze(cleaned)
        expect(analyzed).to.eql(['9', '"a"', 'a', '7'])
    });

    it("case5", () => {
        const input = `(9 ("a" a) 7)`;

        const cleaned = clean(input)
        const analyzed = analyze(cleaned)
        expect(analyzed).to.eql(['9', ['"a"', "a"], '7'])
    });

    it("case6", () => {
        const input = `( 1 (2) "aaa" i1 3  i2 "b" ("c" "d"))`;

        const cleaned = clean(input)
        const analyzed = analyze(cleaned)
        expect(analyzed).to.eql(['1', ['2'], '"aaa"', 'i1', '3', 'i2', '"b"', ['"c"', '"d"']])
    });


    it("case7", () => {
        const input = `"foo"`;

        const cleaned = clean(input)
        const analyzed = analyze(cleaned)
        expect(analyzed).to.eql('"foo"')
    });


    it("case8", () => {
        const input = `("foo" "bar")`;

        const cleaned = clean(input)
        const analyzed = analyze(cleaned)
        expect(analyzed).to.eql(['"foo"','"bar"'])
    });


    it("case9", () => {
        const input = `( 1  2 "c")`;

        const cleaned = clean(input)
        const analyzed = analyze(cleaned)
        expect(analyzed).to.eql(['1','2','"c"'])
    });


});

