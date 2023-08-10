import {Route, Routes, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import queryString from "query-string";

import {appContext} from "@services/Context";

import {Home, Catalog, Product} from "@pages";


export default function App() {
    const [isMale, setIsMale] = useState(true);

    const [searchValue, setSearchValue] = useState('');

    const [cartItems, setCartItems] = useState([]);
    const [likedItems, setLikedItems] = useState([]);

    const {search} = useLocation();


    useEffect(() => {
        const favourites = JSON.parse(localStorage.getItem('favourites'));
        const cart = JSON.parse(localStorage.getItem('cart'));

        Array.isArray(favourites) && setLikedItems(favourites);
        Array.isArray(cart) && setCartItems(cart);
    }, [])

    useEffect(() => {
        const paramsSearch = queryString.parse(search)['search'];

        !!paramsSearch && setSearchValue(paramsSearch);
    }, [search])
    

    const onAddToCart = async (id) => {
        if (cartItems.find(obj => obj.id === id)) {
            const amount = cartItems.find(obj => obj.id === id).amount;
            setCartItems(prev => prev.filter(obj => obj.id !== id));
            setCartItems(prev => [...prev, { id: id, amount: amount + 1 }]);
            // localStorage.setItem("cart", JSON.stringify(cartItems.filter(obj => obj !== item)));
        } else {
            setCartItems(prev => [...prev, { id: id, amount: 1 }]);
            // localStorage.setItem("cart", JSON.stringify([...cartItems, id]));
        }
    }
    
    const onAddToFavourites = async (id) => {
        if (likedItems.find(obj => Number(obj) === Number(id))) {
            setLikedItems(prev => prev.filter(obj => Number(obj) !== Number(id)));
            localStorage.setItem("favourites", JSON.stringify(likedItems.filter(obj => Number(obj) !== Number(id))));
        } else {
            setLikedItems(prev => [...prev, id]);
            localStorage.setItem("favourites", JSON.stringify([...likedItems, id]));
        }
    }

    const isInFavourites = async (id) => likedItems.includes(id);
    

    return (
        <appContext.Provider value={{isMale, isInFavourites, onAddToFavourites, onAddToCart, setIsMale, searchValue, setSearchValue}}>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/catalog/:filters?' element={<Catalog />}></Route>
                <Route path='/catalog/product/:id' element={<Product />}></Route>
            </Routes>
        </appContext.Provider>
    );
}
