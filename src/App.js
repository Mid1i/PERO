import React from "react";
import queryString from 'query-string';
import { Route, Routes, useLocation } from "react-router-dom";

import { appContext } from "@services/Context";

import { Home, Catalog, Product } from "@pages";

function App() {
    const [isBurgerOpen, setBurgerOpen] = React.useState(false);
    const [isMale, setIsMale] = React.useState(true);
    const [likedItems, setLikedItems] = React.useState([]);


    const { search } = useLocation();

    React.useEffect(() => {
        const gender = queryString.parse(search);

        if (Object.keys(gender).find(obj => obj === "isMale") && (gender.isMale === "true" || gender.isMale === "false")) {
            gender.isMale === "true" && setIsMale(true);
            gender.isMale === "false" && setIsMale(false);
        }
    }, [search])

    React.useEffect(() => {
        document.body.classList.toggle("no-scroll");
    }, [isBurgerOpen])

    const addToFavourites = (item) => {
        if (likedItems.find(obj => Number(obj.id) === Number(item.id))) {
            setLikedItems(prev => prev.filter(obj => Number(obj.id) !== Number(item.id)));
        } else {
            setLikedItems(prev => [...prev, item]);
        }
    }

    const isInFavourites = (item) => likedItems.find(obj => Number(obj.id) === Number(item.id));


    return (
        <appContext.Provider value={{ isMale, setIsMale, isBurgerOpen, setBurgerOpen, addToFavourites, isInFavourites }}>
            <Routes>
                <Route path="/" element={ <Home /> } ></Route>
                <Route path="/catalog/:filters?" element={ <Catalog /> } ></Route>
                <Route path="/catalog/product/:id" element={ <Product /> } ></Route>
            </Routes>
        </appContext.Provider>
    );
}

export default App;
