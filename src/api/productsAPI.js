import axios from "axios";


export async function fetchProducts() {
    const {data} = await axios.get('https://java.pero-nn.ru/api/public/get_sneakers?page=0&size=12&isPopular=true'); 
    return data.page.content;
}


export async function fetchRandomProducts() {
    const {data} = await axios.get('https://java.pero-nn.ru/api/public/get_sneakers?page=0&size=20');
    return data.page.content;
}


export async function fetchRandomGenderProducts({queryKey}) {
    const {data} = await axios.get(`https://java.pero-nn.ru/api/public/get_sneakers?page=0&size=20&isMale=${queryKey[2]}`);
    return data.page.content;
}


export async function fetchCatalogProducts({queryKey, pageParam = 0}) {
    const {data} = await axios.get(`https://java.pero-nn.ru/api/public/get_sneakers?page=${pageParam}&size=4&isMale=${queryKey[1]}${queryKey[2].replace('?', '&')}`);
    
    await new Promise(resolve => setTimeout(() => resolve(true), 200));
    
    return data;
}