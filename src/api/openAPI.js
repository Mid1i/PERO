import {openURL} from "@utils/constants";


export const fetchColors = `${openURL}/colors`;

export const fetchCurrentProduct = (id) => `${openURL}/sneaker/${id}`;


export const fetchProducts = `${openURL}/sneakers?page=0&size=50&isPopular=true`;

export const fetchRandomProducts = (isMale) => `${openURL}/sneakers?page=0&size=20&isMale=${isMale}`;

export const fetchCatalogProducts = (page, isMale, link) => `${openURL}/sneakers?page=${page}&size=5&isMale=${isMale}${link.replace('?', '&')}`;
