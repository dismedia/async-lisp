import * as nodeReadline from "readline";
import {InputSource} from "../domain";


export const createReadlineInputSource: () => InputSource = () => {

    const rl = nodeReadline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    return (
        {
            ask: (q) => new Promise(resolve => {
                rl.question(q, (result) => {
                    resolve(result)
                })
            }),
            close: () => rl.close()
        }
    )

}

