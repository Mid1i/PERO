import {useState, useEffect, useReducer} from "react";
import {useLocation} from "react-router-dom";
import {isMobile} from "react-device-detect";
import queryString from "query-string";
import axios from "axios";

import {isPWA, onAddToArray, onCreateArray, onRemoveFromArray} from "@utils/helpers";
import {fetchFavouriteProducts, updateFavouriteProducts} from "@api";
import {appContext, Routers} from "@services";
import {useUserRequest} from "@hooks";


export default function App() {
    const [isMale, setIsMale] = useState(true);
    const [isRegisteredUser, setIsRegisteredUser] = useReducer(prev => !prev, false);
    const [installPopup, setInstallPopup] = useReducer(prev => !prev, false);
    const [authPopup, setAuthPopup] = useReducer(prev => !prev, false);
    const [favouriteItems, setFavouriteItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [token, setToken] = useState('');

    const {search} = useLocation();

    const {requestData: {data: favouriteData, status: favouriteStatus}} = useUserRequest(fetchFavouriteProducts, token, isRegisteredUser); 
    

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
        if (favouriteStatus === 'complete') setFavouriteItems(favouriteData);
    }, [favouriteStatus]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const paramsSearch = queryString.parse(search)['search'];
        if (!!paramsSearch) setSearchValue(paramsSearch);
    }, [search])
    

    const onAddToCart = (id) => {
        if (cartItems.find(obj => obj.id === id)) {
            const amount = cartItems.find(obj => obj.id === id).amount;
            setCartItems(prev => prev.filter(obj => obj.id !== id));
            setCartItems(prev => [...prev, {id: id, amount: amount + 1}]);
            onAddToArray('cart', cartItems, id, amount + 1);
        } else {
            setCartItems(prev => [...prev, {id: id, amount: 1}]);
            onAddToArray('cart', cartItems, id, 1);
        }
    }
    
    const onAddToFavourite = (id, preview, name, price) => {
        if (!isRegisteredUser) {
            if (favouriteItems.find(obj => Number(obj) === Number(id))) {
                setFavouriteItems(prev => prev.filter(obj => Number(obj) !== Number(id)));
                onRemoveFromArray('favourite', favouriteItems, id);
            } else {
                setFavouriteItems(prev => [...prev, id]);
                onAddToArray('favourite', favouriteItems, id);
            }
        } else {
            // if (favouriteItems.find(obj => obj.id === id)) {
            //     setFavouriteItems(prev => prev.filter(obj => obj.id !== id));
            // } else {
            //     setFavouriteItems(prev => [...prev, {id: id, preview: preview, name: name, price: price}]);
            // }

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
        favouriteItems,
        installPopup,
        isMale, 
        isInFavourite, 
        onAddToFavourite, 
        onAddToCart,
        isRegisteredUser,
        token,
        setAuthPopup,
        setIsMale,
        searchValue, 
        setInstallPopup,
        setSearchValue,
    };


    return (
        <appContext.Provider value={{...contextData}}>
            <Routers/>
        </appContext.Provider>
    );
}
