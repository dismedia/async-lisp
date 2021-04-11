import {Compilable} from "../../domain";

export type TypeCreator<T>=(input: T)=>Compilable
