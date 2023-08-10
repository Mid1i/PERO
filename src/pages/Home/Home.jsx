import {useNavigate} from "react-router-dom";
import axios from "axios";

// import {installPWA} from "../../serviceWorker";
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


    const fetchItems = () => axios.get('https://java.pero-nn.ru/api/public/get_sneakers?page=0&size=15&isPopular=true');

    const [items, error, loading] = useRequest(fetchItems, 'items');


    return (
        <>
            <HeaderTop />
            <SearchBar />
            <Brands />
            
            <div className="content content--home">
                <GoodsSlider />
                <div className="goods">
                    {/*<button className="add-button" onClick={() => installPWA()}>click</button>*/}
                    <div className="goods__title">
                        <h4 className="goods__title-left">Наиболее популярные</h4>
                        <h5 className="goods__title-right" onClick={() => navigate('/catalog/')}>Больше кроссовок</h5>
                    </div>
                    <div className="goods__content">
                        {loading ? <LoadingCard /> : ((!items || error || items.length === 0) ? (
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
