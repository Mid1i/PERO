import {userURL} from "@utils/constants";


export const fetchFavouriteProducts = `${userURL}/favourite?page=0&size=20`;

export const updateFavouriteProducts = (id) => `${userURL}/favourite/update/${id}`;