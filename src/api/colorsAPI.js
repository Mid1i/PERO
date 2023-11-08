import axios from "axios";

import {mainURL} from "@utils/constants";


export async function fetchColors() {
    const {data} = await axios.get(`${mainURL}/get_colors`);
    return data;
}