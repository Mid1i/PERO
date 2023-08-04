import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import React from "react";

import { Header, SearchBar, Filters, Card, LoadingCard, EmptyContent, Footer } from "@components";
import { useCatalogRequest, useScroll} from "@hooks";
import { catalogContext } from "@services/Context";
import { filters } from "@utils/constants";

import "./Catalog.styles.scss";


function Catalog() {
    const [filtersLink, setFiltersLink] = React.useState([]);
    const [params, setParams] = React.useState([]);
    
    const [items, loading, amount, colors, colorsLoading] = useCatalogRequest(params);

    const { search } = useLocation();
    useScroll();

    React.useEffect(() => {
        setParams(queryString.parse(search));
    }, [search])


    const onChangeFiltersLink = (id, item) => {
        if (item === "") {
            setFiltersLink(prev => [...prev.filter(el => !Object.keys(el).includes(id))]);
        } else {
            setFiltersLink(prev => [...prev.filter(el => !Object.keys(el).includes(id)), {[id]: item}]);
        }
    }

    function formLink() {
        return `${filtersLink.map(item => `${Object.keys(item)}=${item[Object.keys(item)]}`)
                             .join('&')}`;
    }


    return (
        <catalogContext.Provider value={{ params, onChangeFiltersLink, formLink }}>
            <Header pageToLink={ "/" } pageToLinkName={ "Главная" } />
            <SearchBar />
            <div className="content">
                <div className="catalog">
                    { !loading ? <>
                                    <h2 className="catalog__title">
                                        <span>Мужская обувь</span>
                                        <span>{ `— ${amount}` }</span>
                                    </h2>
                                    <div className="catalog__filters filters">
                                        { !colorsLoading ? filters.map((item, i) => <Filters 
                                                                                        { ...item }
                                                                                        elements = { item.id === "colors" ? colors : item.elements }
                                                                                        key = { i } 
                                                                                        isPrice = { item.title === "Цена" ? true : false }
                                                                                    />)
                                            : null }
                                    </div>
                                 </>
                     : null }
                </div>

                <div className="goods">
                    <div className="goods__content">
                        { loading ? <LoadingCard /> 
                            : (!items ? <EmptyContent 
                                            title = "Пока что все распродано"
                                            text = "Но в ближайшее время ожидаются крупные поставки!"
                                        />
                                : items.map((item, i) => <Card 
                                                            key = { i }
                                                            item = { item }
                                                         />)
                              )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </catalogContext.Provider>
    )
}

export default Catalog;