import {QueryClient, QueryClientProvider} from "react-query";
import {useState, useEffect, useReducer} from "react";
import {useLocation} from "react-router-dom";
import {isMobile} from "react-device-detect";
import queryString from "query-string";

import {appContext, Routers} from "@services";
import {isPWA} from "@utils/helpers";


export default function App() {
    const [isMale, setIsMale] = useState(true);
    const [isRegisteredUser, setIsRegisteredUser] = useReducer(prev => !prev, false);
    const [installPopup, setInstallPopup] = useReducer(prev => !prev, false);
    const [authPopup, setAuthPopup] = useReducer(prev => !prev, false);
    const [searchValue, setSearchValue] = useState('');
    const [likedItems, setLikedItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const queryClient = new QueryClient();
    const {search} = useLocation();
    
    
    useEffect(() => {
        const favourites = JSON.parse(localStorage.getItem('favorites'));
        const cart = JSON.parse(localStorage.getItem('cart'));

        Array.isArray(favourites) && setLikedItems(favourites);
        Array.isArray(cart) && setCartItems(cart);

        if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) setIsRegisteredUser();

        if (!isPWA() && isMobile && !(localStorage.getItem('showInstall'))) {
            localStorage.setItem('showInstall', 'false');
            setInstallPopup();
        }
    }, [])

    useEffect(() => {
        const paramsSearch = queryString.parse(search)['search'];
        if (!!paramsSearch) setSearchValue(paramsSearch);
    }, [search])
    

    const onAddToCart = (id) => {
        if (cartItems.find(obj => obj.id === id)) {
            const amount = cartItems.find(obj => obj.id === id).amount;
            setCartItems(prev => prev.filter(obj => obj.id !== id));
            setCartItems(prev => [...prev, {id: id, amount: amount + 1}]);
            localStorage.setItem('cart', JSON.stringify([...cartItems.filter(obj => obj.id !== id), {id: id, amount: amount + 1}]));
        } else {
            setCartItems(prev => [...prev, {id: id, amount: 1}]);
            localStorage.setItem('cart', JSON.stringify([...cartItems, {id: id, amount: 1}]));
        }
    }
    
    const onAddToFavorites = (id) => {
        if (likedItems.find(obj => Number(obj) === Number(id))) {
            setLikedItems(prev => prev.filter(obj => Number(obj) !== Number(id)));
            localStorage.setItem("favorites", JSON.stringify(likedItems.filter(obj => Number(obj) !== Number(id))));
        } else {
            setLikedItems(prev => [...prev, id]);
            localStorage.setItem("favorites", JSON.stringify([...likedItems, id]));
        }
    }
    
    const isInFavorites = (id) => likedItems.includes(id);
    
    const contextData = {
        authPopup,
        cartItems,
        installPopup,
        isMale, 
        isInFavorites, 
        onAddToFavorites, 
        onAddToCart,
        isRegisteredUser,
        setAuthPopup,
        setIsMale,
        searchValue, 
        setInstallPopup,
        setSearchValue,
    };


    return (
        <QueryClientProvider client={queryClient}>
            <appContext.Provider value={{...contextData}}>
                <Routers />
            </appContext.Provider>
        </QueryClientProvider>
    );
}
