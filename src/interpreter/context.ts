import {Context} from "../domain";


export const createContext: (scope?: any, parent?: Context) => Context = (scope: any = {}, parent: Context = null) =>
    (id => scope.hasOwnProperty(id) ? scope[id] : parent ? parent(id) : undefined)



const nthDbgSym="#nth"
export const createDebugContext: (scope?: any, parent?: Context) => Context = (scope: any = {}, parent: Context = null) => {

    const nth=!parent?scope[nthDbgSym]=0:parent(nthDbgSym as unknown as string)+1

    const value = (id => scope.hasOwnProperty(id) ? (() => {

        id==nthDbgSym||console.log(`found {${id}} : `,scope[id],"/",nth==0? "root":nth )
        return scope[id]
    })() : parent ? parent(id) : (() => {

        console.log(`could not find {${id}}`)
        return undefined
    })())

    return value;
}

