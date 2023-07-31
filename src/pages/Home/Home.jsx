import React from "react";
import axios from "axios";
import ContentLoader from "react-content-loader";

import { Header, SearchBar, Brands, GoodsSlider, Card, Footer } from "@components";

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

    const emptyBlock = () => (
        <div className="empty">
            <h2 className="empty__title">Пока что все распродано</h2>
            <p className="empty__text">Но в ближайшее время ожидаются крупные поставки!</p>
        </div>
    )

    const loadingProducts = () => ([...Array(15)].map((item, i) => (
        <div className="goods-item" key={ i } >
            <ContentLoader 
                speed = { 2 }
                width = { window.innerWidth > 610 ? 280 : 145 }
                height = { window.innerWidth > 610 ? 390 : 190 }
                viewBox = "0 0 280 390"
                backgroundColor = "#f3f3f3"
                foregroundColor = "#ecebeb"
            >
                <rect x="556" y="228" rx="3" ry="3" width="88" height="6" /> 
                <rect x="551" y="220" rx="3" ry="3" width="52" height="6" /> 
                <rect x="444" y="228" rx="3" ry="3" width="410" height="6" /> 
                <rect x="444" y="244" rx="3" ry="3" width="380" height="6" /> 
                <rect x="444" y="260" rx="3" ry="3" width="178" height="6" /> 
                <circle cx="579" cy="231" r="20" /> 
                <rect x="0" y="0" rx={ window.innerWidth > 610 ? 50 : 5 } ry={ window.innerWidth > 610 ? 50 : 5 } width="260" height="280" /> 
                <rect x="521" y="284" rx="10" ry="10" width="80" height="19" /> 
                <rect x="569" y="284" rx="10" ry="10" width="32" height="32" /> 
                <rect x="0" y="300" rx="5" ry="5" width="260" height="18" /> 
                <rect x="60" y="340" rx="5" ry="5" width="140" height="24" />
            </ContentLoader>
        </div>
    )))
    
    return (<>
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
                    { isLoading ? loadingProducts() : (items.length === 0 ? emptyBlock() : items.map((item, i) => <Card 
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