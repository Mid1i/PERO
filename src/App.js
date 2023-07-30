import React from "react";
import axios from "axios";
import { Route, Routes, useLocation } from "react-router-dom";

import appContext from "@services/Context";

import { Home, Product } from "@pages";

function App() {
    const location = useLocation();

    const [items, setItems] = React.useState([]);
    const [isBurgerOpen, setBurgerOpen] = React.useState(false);
    const [likedItems, setLikedItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const itemsResponse = await axios.get("https://java.pero-nn.ru/api/public/get_sneakers?page=0&size=15");
                setItems(itemsResponse.data.content);

            } catch(error) {
                console.error(error);

            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    React.useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    const addToFavourites = (item) => {
        if (likedItems.find(obj => Number(obj.id) === Number(item.id))) {
            setLikedItems(prev => prev.filter(obj => Number(obj.id) !== Number(item.id)));
        } else {
            setLikedItems(prev => [...prev, item]);
        }
    }

    const isInFavourites = (item) => likedItems.find(obj => Number(obj.id) === Number(item.id));

    if (isBurgerOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    const toFormat = (str) => String(str).split('').reverse().join('').match(/\d{0,3}/g).join(' ').split('').reverse().join('');

    return (
        <appContext.Provider value={{ items, isLoading, isBurgerOpen, addToFavourites, isInFavourites, setBurgerOpen, toFormat }}>
            <Routes>
                <Route path="/" element={ <Home /> } >

                </Route>

                <Route path="/catalog/product/:id" element={ <Product /> } >

                </Route>
            </Routes>
        </appContext.Provider>
    );
}

export default App;
