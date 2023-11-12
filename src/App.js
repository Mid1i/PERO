import {useState, useEffect, useReducer} from "react";
import {useLocation} from "react-router-dom";
import {isMobile} from "react-device-detect";
import queryString from "query-string";

// import {fetchFavouriteProducts} from "@api";
import {appContext, Routers} from "@services";
// import {useUserRequest} from "@hooks/useUserRequest";
import {isPWA, onAddToArray, onCreateArray, onRemoveFromArray} from "@utils/helpers";


export default function App() {
    const [isMale, setIsMale] = useState(true);
    const [isRegisteredUser, setIsRegisteredUser] = useReducer(prev => !prev, false);
    const [installPopup, setInstallPopup] = useReducer(prev => !prev, false);
    const [authPopup, setAuthPopup] = useReducer(prev => !prev, false);
    const [favouriteItems, setFavouriteItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartItems, setCartItems] = useState([]);

    const {search} = useLocation();


    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
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
            onAddToArray('cart', cartItems, id, amount + 1);
        } else {
            setCartItems(prev => [...prev, {id: id, amount: 1}]);
            onAddToArray('cart', cartItems, id, 1);
        }
    }
    
    const onAddToFavorite = (id) => {
        if (favouriteItems.find(obj => Number(obj) === Number(id))) {
            setFavouriteItems(prev => prev.filter(obj => Number(obj) !== Number(id)));
            onRemoveFromArray('favourite', favouriteItems, id);
        } else {
            setFavouriteItems(prev => [...prev, id]);
            onAddToArray('favourite', favouriteItems, id);
        }
    }
    
    const isInFavorite = (id) => favouriteItems.includes(id);
    
    
    const contextData = {
        authPopup,
        cartItems,
        installPopup,
        isMale, 
        isInFavorite, 
        onAddToFavorite, 
        onAddToCart,
        isRegisteredUser,
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
