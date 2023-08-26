import {QueryClient, QueryClientProvider} from "react-query";
import {Route, Routes, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import queryString from "query-string";

import {appContext} from "@services/Context";

import {Home, Catalog, Product} from "@pages";


export default function App() {
    const [isMale, setIsMale] = useState(true);
    const [regPopup, setRegPopup] = useState(false);
    
    const [searchValue, setSearchValue] = useState('');

    const [cartItems, setCartItems] = useState([]);
    const [likedItems, setLikedItems] = useState([]);

    const {search} = useLocation();

    const queryClient = new QueryClient();


    useEffect(() => {
        const favourites = JSON.parse(localStorage.getItem('favorites'));
        const cart = JSON.parse(localStorage.getItem('cart'));

        Array.isArray(favourites) && setLikedItems(favourites);
        Array.isArray(cart) && setCartItems(cart);
    }, [])

    useEffect(() => {
        const paramsSearch = queryString.parse(search)['search'];

        !!paramsSearch && setSearchValue(paramsSearch);
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
        isMale, 
        isInFavorites, 
        onAddToFavorites, 
        onAddToCart,
        regPopup,
        setIsMale, 
        setRegPopup, 
        searchValue, 
        setSearchValue,
    };


    return (
        <QueryClientProvider client={queryClient}>
            <appContext.Provider value={{...contextData}}>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/catalog/:filters?' element={<Catalog />}></Route>
                    <Route path='/catalog/product/:id' element={<Product />}></Route>
                </Routes>
            </appContext.Provider>
        </QueryClientProvider>
    );
}
