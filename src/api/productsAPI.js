import axios from "axios";

import {mainURL} from "@utils/constants";


export async function fetchProducts() {
    const {data} = await axios.get(`${mainURL}/get_sneakers?page=0&size=50&isPopular=true`); 
    return data.page.content;
}


export async function fetchRandomProducts() {
    const {data} = await axios.get(`${mainURL}/get_sneakers?page=0&size=20`);
    return data.page.content;
}

export async function fetchSearchProducts({queryKey}) {
    const {data} = await axios.get(`${mainURL}/get_sneakers?page=0&size=10${!!queryKey[1] ? `&search=${queryKey[1]}` : ''}`);
    return data.page.content;
}

export async function fetchRandomGenderProducts({queryKey}) {
    const {data} = await axios.get(`${mainURL}/get_sneakers?page=0&size=20&isMale=${queryKey[2]}`);
    return data.page.content;
}


export async function fetchCatalogProducts({queryKey, pageParam = 0}) {
    const {data} = await axios.get(`${mainURL}/get_sneakers?page=${pageParam}&size=5&isMale=${queryKey[1]}${queryKey[2].replace('?', '&')}`);
    
    await new Promise(resolve => setTimeout(() => resolve(true), 200));
    
    return data;
}