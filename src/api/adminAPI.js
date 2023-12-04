import {adminURL} from "@utils/constants";


export const fetchSneakers = (url) => `${adminURL}/sneakers?page=0&size=100${url}`;


export const createSneaker = `${adminURL}/sneaker/create`;

export const addSizes = (id) => `${adminURL}/sneaker/add/sizes/${id}`;