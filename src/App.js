import React from "react";
import { Route, Routes } from "react-router-dom";

import { appContext } from "@services/Context";

import { Home, Catalog, Product } from "@pages";

function App() {
    const [isBurgerOpen, setBurgerOpen] = React.useState(false);
    const [likedItems, setLikedItems] = React.useState([]);

    React.useEffect(() => {
        isBurgerOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
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
        <appContext.Provider value={{ isBurgerOpen, setBurgerOpen, addToFavourites, isInFavourites }}>
            <Routes>
                <Route path="/" element={ <Home /> } ></Route>
                <Route path="/catalog/:filters?" element={ <Catalog /> } ></Route>
                <Route path="/catalog/product/:id" element={ <Product /> } ></Route>
            </Routes>
        </appContext.Provider>
    );
}

export default App;
