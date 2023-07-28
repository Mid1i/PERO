import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import appContext from "@services/context";

import { Home } from "@pages";

function App() {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const itemsResponse = await axios.get("https://2dc7-5-3-213-245.ngrok-free.app/api/public/get_sneakers?page=0&size=12");
                setItems(itemsResponse.data.content);
            
            } catch(error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <appContext.Provider value={{ items }}>
            <Routes>
                <Route path="/" element={ <Home /> } >

                </Route>
            </Routes>
        </appContext.Provider>
    );
}

export default App;
