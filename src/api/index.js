import {fetchCartOpenProducts, fetchCatalogProducts, fetchColors, fetchCurrentProduct, fetchFavouriteOpenProducts, fetchProducts, fetchRandomProducts} from "./openAPI";
import {fetchAuthVerify, fetchAuthPasswordReset, fetchAuthSignOut, fetchRegistration, fetchEmail, fetchPasswordReset, fetchLogin, globalAuthSignOut, refreshTokens} from "./authAPI";
import {addCartProducts, fetchCartProducts, fetchFavouriteProducts, fetchUserData, removeCartProducts, updateCartProducts, updateUserData, updateFavouriteProducts, substractCartProducts} from "./userAPI";
import {addPreview, addSizes, createSneaker, fetchCounters, fetchSneakers} from "./adminAPI";


export {
    addPreview,
    addSizes,
    createSneaker,
    fetchAuthVerify,
    fetchAuthPasswordReset,
    addCartProducts,
    fetchAuthSignOut,
    fetchCartProducts,
    fetchCartOpenProducts,
    fetchCatalogProducts,
    fetchColors,
    fetchCounters,
    fetchCurrentProduct,
    fetchEmail,
    fetchFavouriteProducts,
    fetchFavouriteOpenProducts,
    fetchLogin,
    fetchSneakers,
    fetchPasswordReset,
    fetchProducts,
    fetchUserData,
    fetchRandomProducts,
    fetchRegistration,
    globalAuthSignOut,
    refreshTokens,
    removeCartProducts,
    updateCartProducts,
    updateUserData,
    updateFavouriteProducts,
    substractCartProducts,
};