import {userURL} from "@utils/constants";


export const fetchUserData = `${userURL}/profile`;

export const updateUserData = `${userURL}/profile/edit`;


export const fetchFavouriteProducts = `${userURL}/favourite?page=0&size=20`;

export const updateFavouriteProducts = (id) => `${userURL}/favourite/update/${id}`;


export const fetchCartProducts = `${userURL}/cart?page=0&size=20`;

export const addCartProducts = (sizeId) => `${userURL}/cart/add/${sizeId}`;

export const substractCartProducts = `${userURL}/cart/update`;

export const removeCartProducts = (sizeId) => `${userURL}/cart/remove/${sizeId}`;

export const updateCartProducts = (sizeId) => `${userURL}/cart/update/${sizeId}`;