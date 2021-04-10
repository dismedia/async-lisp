import {Context} from "./domain";

export const createContext: (scope: any, parent: Context) => Context = (scope: any, parent: Context=null) =>
    (id => scope.hasOwnProperty(id) ? scope[id] : parent ? parent(id) : undefined)


