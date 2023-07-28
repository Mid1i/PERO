import React from "react";

import { Header, SearchBar, Brands, GoodsSlider, Product } from "@components";

import appContext from "@services/context";

import "./Home.styles.scss";

function Home() {
    const { items } = React.useContext(appContext);
    
    return (<>
        <Header />
        <SearchBar />
        <Brands />
        <div className="content">
            <GoodsSlider />
            <div className="goods">
                <div className="goods__title">
                    <h4 className="goods__title-left">Наиболее популярные</h4>
                    <h5 className="goods__title-right">Больше кроссовок</h5>
                </div>
                <div className="goods__content">
                    { items.length === 0 ? <h2>Привет</h2> : items.map((item, i) => <Product 
                                                key = { i }
                                                title = { item.name } 
                                                price = { item.price } 
                                                imageURL = { item.img } 
                    />)}
                </div>
            </div>
        </div>
    </>);
}

export default Home;