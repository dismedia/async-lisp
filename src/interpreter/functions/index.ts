import {add, div, divide, mult, sumArray} from "./add";
import {eq, gt, gte, lt, lte} from "./compare";
import {delay} from "./async";
import {defun} from "./defun";
import {httpGet} from "./http";
import {iff} from "./if";
import {lambda} from "./lambda";
import {lett} from "./let";
import {clist, cons, head, headLazy, tail, tailLazy} from "./list-op";
import {toint} from "./parse";


export const std={
    add,sumArray,div,mult,divide,
    delay,
    eq,gt,lt,lte,gte,
    defun,
    httpGet,
    iff,
    lambda,
    lett,
    clist,cons,head,tail, headLazy,tailLazy,
    toint

}
