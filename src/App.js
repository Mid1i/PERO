import { useState, useEffect } from "react";
import queryString from 'query-string';
import { Route, Routes, useLocation } from "react-router-dom";

import { appContext } from "@services/Context";

import { Home, Catalog, Product } from "@pages";

function App() {
    const [isBurgerOpen, setBurgerOpen] = useState(false);
    const [isMale, setIsMale] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [likedItems, setLikedItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);


    const { search } = useLocation();

    useEffect(() => {
        if (Array.isArray(JSON.parse(localStorage.getItem("favourites")))) {
            setLikedItems(JSON.parse(localStorage.getItem("favourites")));
        }
        if (Array.isArray(JSON.parse(localStorage.getItem("cart")))) {
            setCartItems(JSON.parse(localStorage.getItem("cart")));
        }
    }, [])

    useEffect(() => {
        const gender = queryString.parse(search);

        if (Object.keys(gender).find(obj => obj === "isMale") && (gender.isMale === "true" || gender.isMale === "false")) {
            gender.isMale === "true" && setIsMale(true);
            gender.isMale === "false" && setIsMale(false);
        }
    }, [search])

    useEffect(() => {
        if (isBurgerOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [isBurgerOpen])
    
    function onAddToFavourites(id) {
        if (likedItems.find(obj => Number(obj) === Number(id))) {
            setLikedItems(prev => prev.filter(obj => Number(obj) !== Number(id)));
            localStorage.setItem("favourites", JSON.stringify(likedItems.filter(obj => Number(obj) !== Number(id))));
        } else {
            setLikedItems(prev => [...prev, id]);
            localStorage.setItem("favourites", JSON.stringify([...likedItems, id]));
        }
    }

    function isInFavourites(id) {
        return likedItems.find(obj => Number(obj) === Number(id)) ? true : false;
    }

    function onAddToCart(id) {
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
    

    return (
        <appContext.Provider value={{ searchValue, setSearchValue, isMale, setIsMale, isBurgerOpen, setBurgerOpen, onAddToFavourites, isInFavourites, onAddToCart }}>
            <Routes>
                <Route path="/" element={ <Home /> } ></Route>
                <Route path="/catalog/:filters?" element={ <Catalog /> } ></Route>
                <Route path="/catalog/product/:id" element={ <Product /> } ></Route>
            </Routes>
        </appContext.Provider>
    );
}

export default App;
