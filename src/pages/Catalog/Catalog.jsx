import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import { Header, SearchBar, Filters, Card, LoadingCard, EmptyContent, Footer } from "@components";
import ScrollToTop from "@utils/helpers/scroll.helper";
import { filters } from "@utils/constants/filters.constants";
import { catalogContext } from "@services/Context";

import "./Catalog.styles.scss";

function Catalog() {
    const [items, setItems] = React.useState([]);
    const [commonFilters, setCommonFilters] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const { search } = useLocation();

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

    React.useEffect(() => console.log(search), [search]);

    const onChangeFilters = (obj) => {
        if (commonFilters.find(item => item.id === obj.id)) {
            setCommonFilters(prev => [...prev.filter(item => item.id !== obj.id), obj]);
        } else {
            setCommonFilters(prev => [...prev, obj]);
        }
    }

    return (
        <catalogContext.Provider value={{ onChangeFilters }}>
            <ScrollToTop />
            <Header pageToLink={ "/" } pageToLinkName={ "Главная" } />
            <SearchBar />
            <div className="content">
                <div className="catalog">
                    <h2 className="catalog__title">
                        <span>Мужская обувь</span>
                        <span>— 25</span>
                    </h2>
                    <div className="catalog__filters filters">
                        { filters.map((item, i) => {
                            return (
                                <Filters 
                                    { ...item }
                                    key = { i } 
                                    isPrice = { item.title === "Цена" ? true : false }
                                    />
                            )
                        })}
                    </div>
                </div>
                <div className="goods">
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
        </catalogContext.Provider>
    )
}

export default Catalog;