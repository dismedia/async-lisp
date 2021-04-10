import {Compileable} from "../domain";



export type TypeCreator<T>=(input: T)=>Compileable
