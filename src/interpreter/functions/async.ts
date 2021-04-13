import {FunctionDef} from "./domain";


export const delay: FunctionDef = (...elements) => async (context) => {

    const name: string = await elements[0](context) as any;
    const steps: number = await elements[1](context) as any;
    const interval: number = await elements[2](context) as any;

    await new Promise<void>(resolve => {

        let s = steps;
        const iid = setInterval(() => {

            s--;
            console.log(`delay ${name} : ${s}`);
            if (s < 1) {

                resolve()
                clearInterval(iid)
            }

        }, interval)

    })

    return await elements[3](context);

}

