import {fetchCartOpenProducts, fetchCatalogProducts, fetchColors, fetchCurrentProduct, fetchFavouriteOpenProducts, fetchProducts, fetchRandomProducts} from "./openAPI";
import {fetchAuthVerify, fetchAuthPasswordReset, fetchAuthSignOut, fetchRegistration, fetchEmail, fetchPasswordReset, fetchLogin,refreshTokens} from "./authAPI";
import {addCartProducts, fetchCartProducts, fetchFavouriteProducts, fetchUserData, removeCartProducts, updateCartProducts, updateFavouriteProducts, substractCartProducts} from "./userAPI";


export {
    fetchAuthVerify,
    fetchAuthPasswordReset,
    addCartProducts,
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
    fetchPasswordReset,
    fetchProducts,
    fetchUserData,
    fetchRandomProducts,
    fetchRegistration,
    refreshTokens,
    removeCartProducts,
    updateCartProducts,
    updateFavouriteProducts,
    substractCartProducts,
};