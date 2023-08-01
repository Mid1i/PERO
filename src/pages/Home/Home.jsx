import React from "react";
import axios from "axios";

import { Header, SearchBar, Brands, GoodsSlider, Card, LoadingCard, EmptyContent, Footer } from "@components";
import ScrollToTop from "@utils/helpers/scroll.helper";

import "./Home.styles.scss";

function Home() {
    const [items, setItems] = React.useState([]);
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
    
    return (<>
        <ScrollToTop />
        <Header />
        <SearchBar />
        <Brands />

        <div className="content content--home">
            <GoodsSlider />
            <div className="goods">
                <div className="goods__title">
                    <h4 className="goods__title-left">Наиболее популярные</h4>
                    <h5 className="goods__title-right">Больше кроссовок</h5>
                </div>
                <div className="goods__content">
                    { isLoading ? <LoadingCard /> 
                        : (items.length === 0 ? <EmptyContent 
                                                    title = "Пока что все распродано"
                                                    text = "Но в ближайшее время ожидаются крупные поставки!"
                        /> 
                            : items.map((item, i) => <Card 
                                        key = { i }
                                        item = { item }
                    />))}
                </div>
            </div>
        </div>
        
        <Footer />
    </>);
}

export default Home;