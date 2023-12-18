import {fetchCartOpenProducts, fetchCatalogProducts, fetchColors, fetchCurrentProduct, fetchFavouriteOpenProducts, fetchProducts, fetchRandomProducts} from "./openAPI";
import {fetchAuthVerify, fetchAuthPasswordReset, fetchAuthSignOut, fetchRegistration, fetchEmail, fetchLogin, globalAuthSignOut, refreshTokens} from "./authAPI";
import {addCartProducts, fetchCartProducts, fetchFavouriteProducts, fetchUserData, removeCartProducts, updateCartProducts, updateUserData, updateFavouriteProducts, substractCartProducts} from "./userAPI";
import {addImage, addPreview, addSizes, createSneaker, fetchCounters, fetchSneakers} from "./adminAPI";


export {
    addImage,
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