import axios from "axios";

import {mainURL} from "@utils/constants";


export async function fetchCurrentProduct({queryKey}) {
    const {data} = await axios.get(`${mainURL}/get_sneaker/${queryKey[1]}`);
    return data;
}
