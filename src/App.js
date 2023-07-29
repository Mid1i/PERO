import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import appContext from "@services/context";

import { Home } from "@pages";

function App() {
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

    return (
        <appContext.Provider value={{ items, isLoading, isBurgerOpen, addToFavourites, isInFavourites, setBurgerOpen }}>
            <Routes>
                <Route path="/" element={ <Home /> } >

                </Route>
            </Routes>
        </appContext.Provider>
    );
}

export default App;
