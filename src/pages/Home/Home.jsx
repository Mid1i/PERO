import {useNavigate} from "react-router-dom";
import axios from "axios";

import {useRequest, useScroll} from "@hooks";
import { 
    Brands, 
    EmptyContent, 
    Footer, 
    GoodsSlider, 
    HeaderTop, 
    LoadingCard, 
    SearchBar, 
    SneakerCard 
} from "@components";

import "./Home.style.scss";


export default function Home() {
    const navigate = useNavigate();

    useScroll();

    
    const fetchItems = () => axios.get('https://java.pero-nn.ru/api/public/get_popular_sneakers?page=0&size=15');

    const [items, loading, error] = useRequest(fetchItems, 'items');


    return (
        <>
            <HeaderTop />
            <SearchBar />
            <Brands />

            <div className="content content--home">
                <GoodsSlider />
                <div className="goods">
                    <div className="goods__title">
                        <h4 className="goods__title-left">Наиболее популярные</h4>
                        <h5 className="goods__title-right" onClick={() => navigate('/catalog/')}>Больше кроссовок</h5>
                    </div>
                    <div className="goods__content">
                        {loading ? <LoadingCard /> : ((!items || error) ? (
                            <EmptyContent 
                                title='Пока что все распродано'
                                text='Но в ближайшее время ожидаются крупные поставки!'
                            /> 
                        ) : items.map((item) => (
                                <SneakerCard 
                                    key={item.id}
                                    {...item}
                                />
                            ) 
                        ))}
                    </div>
                </div>
            </div>
            
            <Footer />
        </>
    );
}
