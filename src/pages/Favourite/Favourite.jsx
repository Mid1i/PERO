// import {appContext} from "@services";
// import {useContext} from "react";
import {
    AuthPopup, 
    // Error,
    // EmptyContent, 
    Footer, 
    Header, 
    // LoadingCard,
    PageUp,
    SearchBar,
    // SneakerCard
} from "@components";

import "./Favourite.style.scss";


export default function Favourite() {
    // const {favoriteItems} = useContext(appContext);
    

    return (
        <>
            <Header/>
            <SearchBar/>
            <div className="content">
                <h1 className="content__title">Избранное</h1>
            </div>
            <Footer/>

            <PageUp/>
            <AuthPopup/>
        </>
    );
}