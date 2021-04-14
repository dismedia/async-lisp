import {add, sumArray} from "./add";
import {eq, gt, gte, lt, lte} from "./compare";
import {delay} from "./async";
import {compile} from "./compile";
import {defun} from "./defun";
import {httpGet} from "./http";
import {iff} from "./if";
import {lambda} from "./lambda";
import {lett} from "./let";
import {head, headLazy, tail, tailLazy} from "./list-op";



export const std={
    add,sumArray,
    delay,
    eq,gt,lt,lte,gte,
    defun,
    httpGet,
    iff,
    lambda,
    lett,
    head,tail, headLazy,tailLazy

}