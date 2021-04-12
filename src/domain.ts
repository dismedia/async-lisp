export type Identifier=string;

export type Context=(id:Identifier)=>any

export type Plain=string|number|boolean|Plain[];

export type Compilable =(context, override?:(input:Compilable|Compilable[])=>Promise<Plain>)=>Promise<Plain>

//it is possible that, at some circumstances, breaking the recurrence chain (or something else), will be needed.
//in that case (on specific function level) shallow compilation (or something else) could be injected to override default behaviour

//example: breaking recurrence in [head] or [tail] to prevent execution of not needed (left behind) items
//example: breaking recurrence in [let] to prevent resolving of variable identifier










