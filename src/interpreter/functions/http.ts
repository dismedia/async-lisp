import {FunctionDef} from "./domain";
import {Plain} from "../../domain";
import axios from "axios";


export const httpGet: FunctionDef = (...elements) => async (context) => {

    const url = await elements[0](context) as string;

    const resposne = await axios.get(url);

    return resposne.data

}
