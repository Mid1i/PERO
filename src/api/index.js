import {fetchCartOpenProducts, fetchCatalogProducts, fetchColors, fetchCurrentProduct, fetchFavouriteOpenProducts, fetchProducts, fetchRandomProducts} from "./openAPI";
import {fetchAuthVerify, fetchAuthSignOut, fetchRegistration, fetchEmail, fetchLogin} from "./authAPI";
import {addCartProducts, fetchCartProducts, fetchFavouriteProducts, removeCartProducts, updateCartProducts, updateFavouriteProducts, substractCartProducts} from "./userAPI";


export {
    addCartProducts,
    fetchAuthVerify,
    fetchAuthSignOut,
    fetchCartProducts,
    fetchCartOpenProducts,
    fetchCatalogProducts,
    fetchColors,
    fetchCurrentProduct,
    fetchEmail,
    fetchFavouriteProducts,
    fetchFavouriteOpenProducts,
    fetchLogin,
    fetchProducts,
    fetchRandomProducts,
    fetchRegistration,
    removeCartProducts,
    updateCartProducts,
    updateFavouriteProducts,
    substractCartProducts,
};