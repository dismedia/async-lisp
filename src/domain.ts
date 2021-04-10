export type Identifier=string;

export type Context=(id:Identifier)=>any

export type Plain=string|number|Plain[];

export type Compileable=(context)=>Promise<Plain>







