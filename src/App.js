import {useState, useEffect, useReducer} from "react";
import {useLocation} from "react-router-dom";
import {isMobile} from "react-device-detect";
import queryString from "query-string";
import axios from "axios";

import {isPWA, onAddToArray, onCreateArray, onRemoveFromArray} from "@utils/helpers";
import {appContext, Routers} from "@services";
import {useUserRequest} from "@hooks";
import {
    addCartProducts, 
    fetchCartProducts, 
    fetchFavouriteProducts, 
    removeCartProducts, 
    updateFavouriteProducts,
    substractCartProducts
} from "@api";


export default function App() {
    const [isRegisteredUser, setIsRegisteredUser] = useReducer(prev => !prev, false);
    const [installPopup, setInstallPopup] = useReducer(prev => !prev, false);
    const [successPopup, setSuccessPopup] = useReducer(prev => !prev, false);
    const [authPopup, setAuthPopup] = useReducer(prev => !prev, false);
    const [favouriteItems, setFavouriteItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [errorPopup, setErrorPopup] = useState(''); 
    const [cartItems, setCartItems] = useState([]);
    const [isMale, setIsMale] = useState(true);
    const [token, setToken] = useState('');

    const {search} = useLocation();

    const {requestData: {data: favouriteData, status: favouriteStatus}} = useUserRequest(fetchFavouriteProducts, token, isRegisteredUser);
    const {requestData: {data: cartData, status: cartStatus}} = useUserRequest(fetchCartProducts, token, isRegisteredUser);  
    

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'));
            localStorage.removeItem('favourite');
            localStorage.removeItem('cart');
            setIsRegisteredUser();
        } else {
            setFavouriteItems(onCreateArray('favourite'));
            setCartItems(onCreateArray('cart'));
        }

        if (!isPWA() && isMobile && !(localStorage.getItem('showInstall'))) {
            localStorage.setItem('showInstall', 'false');
            setInstallPopup();
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (favouriteStatus === 'complete') setFavouriteItems(favouriteData.filter(item => item.active));
        if (cartStatus === 'complete') setCartItems(cartData);
    }, [favouriteStatus, cartStatus]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const paramsSearch = queryString.parse(search)['search'];
        if (!!paramsSearch) setSearchValue(paramsSearch);
    }, [search])
    

    const onAddToCart = (id) => {
        if (!isRegisteredUser) {
            if (cartItems.find(obj => obj.id === id)) {
                setCartItems(prev => [...prev.filter(obj => obj.id !== id), {id: id, amount: prev.find(obj => obj.id === id).amount + 1}]);
                onAddToArray('cart', cartItems, id, cartItems.find(obj => obj.id === id).amount + 1);
            } else {
                setCartItems(prev => [...prev, {id: id, amount: 1}]);
                onAddToArray('cart', cartItems, id, 1);
            }
        } else {
            axios.post(addCartProducts(id), {}, {headers: {'Authorization': `Bearer ${token}`}})
                 .then(response => {
                    const itemIndex = cartItems.findIndex(item => item.sizeId === id);

                    setCartItems(prev => [...prev.slice(0, itemIndex), response.data, ...prev.slice(itemIndex + 1)]);
                    setSuccessPopup();

                    if (isMobile) window.setTimeout(() => {setSuccessPopup();}, 2000);
                 })
                 .catch(error => {
                    if (error.response.status === 400) setErrorPopup(error.response.data); 
                 })
        }
    }

    const onSubstractFromCart = (id, amount) => {
        if (!isRegisteredUser) {
            setCartItems(prev => [...prev.filter(item => item.id !== id), {id: id, amount: amount - 1}]);
            onAddToArray('cart', cartItems, id, amount - 1);
        } else {
            axios.put(substractCartProducts, {quantity: amount - 1, sizeId: id}, {headers: {'Authorization': `Bearer ${token}`}})
                 .then(response => {
                    const itemIndex = cartItems.findIndex(item => item.sizeId === id);
                    
                    setCartItems(prev => [...prev.slice(0, itemIndex), response.data, ...prev.slice(itemIndex + 1)]);
                 })
                 .catch(error => console.log(error))
        }
    }

    const onRemoveFromCart = (id) => {
        if (!isRegisteredUser) {
            setCartItems(prev => prev.filter(item => item.id !== id));
            onRemoveFromArray('cart', cartItems, id);
        } else {
            axios.delete(removeCartProducts(id), {headers: {'Authorization': `Bearer ${token}`}})
                 .then(() => setCartItems(prev => prev.filter(item => item.sizeId !== id)))
                 .catch(error => console.log(error))
        }
    }
    
    const onAddToFavourite = (id) => {
        if (!isRegisteredUser) {
            if (favouriteItems.find(obj => Number(obj) === Number(id))) {
                setFavouriteItems(prev => prev.filter(obj => Number(obj) !== Number(id)));
                onRemoveFromArray('favourite', favouriteItems, id);
            } else {
                setFavouriteItems(prev => [...prev, id]);
                onAddToArray('favourite', favouriteItems, id);
            }
        } else {
            axios.put(updateFavouriteProducts(id), {}, {headers: {'Authorization': `Bearer ${token}`}})
                 .then(response => {
                    if (!!response.data) {
                        setFavouriteItems(prev => [...prev, response.data]);
                    } else {
                        setFavouriteItems(prev => prev.filter(obj => obj.id !== id));
                    }
                 })
                 .catch(error => console.log(error))
        }
    }
    
    const isInFavourite = (id) => {
        if (isRegisteredUser) {
            return favouriteItems.find(item => item.id === id);
        } else {
            return favouriteItems.includes(id);
        }
    }
    
    
    const contextData = {
        authPopup,
        cartItems,
        errorPopup,
        favouriteItems,
        installPopup,
        isMale, 
        isInFavourite, 
        onAddToFavourite, 
        onAddToCart,
        onSubstractFromCart,
        onRemoveFromCart,
        isRegisteredUser,
        token,
        successPopup,
        setSuccessPopup,
        setAuthPopup,
        setErrorPopup,
        setIsMale,
        searchValue, 
        setCartItems,
        setFavouriteItems,
        setInstallPopup,
        setSearchValue,
    };


    return (
        <appContext.Provider value={{...contextData}}>
            <Routers/>
        </appContext.Provider>
    );
}
