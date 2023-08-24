import axios from "axios";

import {getRandomNumber} from "@utils/helpers";


export async function fetchProducts() {
    const {data} = await axios.get('https://java.pero-nn.ru/api/public/get_sneakers?page=0&size=12&isPopular=true'); 
    return data.page.content;
}

export async function fetchRandomProducts() {
    const {data} = await axios.get(`https://java.pero-nn.ru/api/public/get_sneakers?page=${getRandomNumber(0, 1)}&size=10`);
    return data.page.content;
}

export async function fetchCatalogProducts({queryKey, pageParam = 0}) {
    const {data} = await axios.get(`https://java.pero-nn.ru/api/public/get_sneakers?page=${pageParam}&size=4&isMale=${queryKey[1]}${queryKey[2].replace('?', '&')}`);
    return data;
}