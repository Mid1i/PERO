import axios from "axios";
import { useNavigate } from "react-router-dom";

import { HeaderTop, SearchBar, Brands, GoodsSlider, Card, LoadingCard, EmptyContent, Footer } from "@components";
import { useRequest, useScroll } from "@hooks";

import "./Home.styles.scss";


function Home() {
    const [ items, loading, error ] = useRequest(fetchItems, "items");
    const navigate = useNavigate();
    useScroll();

    function fetchItems() {
        return axios.get("https://java.pero-nn.ru/api/public/get_popular_sneakers?page=0&size=15");
    }

    
    return (<>
        <HeaderTop />
        <SearchBar />
        <Brands />

        <div className="content content--home">
            <GoodsSlider />
            <div className="goods">
                <div className="goods__title">
                    <h4 className="goods__title-left">Наиболее популярные</h4>
                    <h5 className="goods__title-right" onClick={ () => navigate("/catalog/") }>Больше кроссовок</h5>
                </div>
                <div className="goods__content">
                    { loading ? <LoadingCard /> 
                        : ((!items || error) ? <EmptyContent 
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