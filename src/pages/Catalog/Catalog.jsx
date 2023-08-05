import { useState, useEffect, useContext } from "react";
import { TailSpin } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { HeaderTop, SearchBar, Sorting, MainFilters, PriceFilters, Card, LoadingCard, EmptyContent, Footer } from "@components";
import { appContext, catalogContext } from "@services/Context";
import { useCatalogRequest, useScroll } from "@hooks";
import { filters } from "@utils/constants";

import "./Catalog.styles.scss";

//TODO: Верстка фильтров

function Catalog() {
    const { isMale } = useContext(appContext);

    const [link, setLink] = useState([]);
    const [params, setParams] = useState([]);
    const [openedFilters, setOpenedFilters] = useState("");
    
    const [items, loading, amount, colors, colorsLoading, fetching, error, colorsError] = useCatalogRequest(params);

    
    const { search } = useLocation();
    useScroll();

    useEffect(() => {
        setParams(queryString.parse(search));
    }, [search])

    function onChangeLink(id, item) {
        if (item || item === "") {
            if (item === "") {
                setLink(prev => [...prev.filter(el => !Object.keys(el).includes(id))]);
            } else {
                setLink(prev => [...prev.filter(el => !Object.keys(el).includes(id)), {[id]: item}]);
                (id === "fromPrice" && item < 3000) && setLink(prev => [...prev.filter(el => !Object.keys(el).includes(id)), {[id]: 3000}]);
                (id === "toPrice" && item > 50000) && setLink(prev => [...prev.filter(el => !Object.keys(el).includes(id)), {[id]: 50000}]);
            }
        }
    }

    function formLink() {
        return `${link.map(item => `${Object.keys(item)}=${item[Object.keys(item)]}`)
                             .join('&')}`;
    }


    return (
        <catalogContext.Provider value={{ params, openedFilters, setOpenedFilters, onChangeLink, formLink }}>
            <HeaderTop pageToLink={ "/" } pageToLinkName={ "Главная" } />
            <SearchBar />
            <div className="content">
                <div className="catalog">
                    { !loading ? <>
                                    <h2 className="catalog__title">
                                        <span>{ isMale ? "Мужская обувь" : "Женская обувь" }</span>
                                        <span>{ `— ${amount}` }</span>
                                    </h2>
                                    <Sorting />
                                    <div className="catalog__filters filters">
                                        { (!colorsLoading && !colorsError) ? filters.map((item, i) => <MainFilters 
                                                                                        { ...item }
                                                                                        elements = { item.id === "colors" ? colors : item.elements }
                                                                                        key = { i } 
                                                                                        isPrice = { item.title === "Цена" ? true : false }
                                                                                    />)
                                            : null }
                                        <PriceFilters />
                                    </div>
                                 </>
                     : null }
                </div>

                <div className="goods">
                    <div className="goods__content">
                        { loading ? <LoadingCard /> 
                            : ((!items || error) ? <EmptyContent 
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
                    { fetching ? <div className="loader--catalog">
                                        <TailSpin color="#E47F46" height={80} width={80} ariaLabel='loading' />
                                     </div>
                        : null }
                </div>
            </div>
            <Footer />
        </catalogContext.Provider>
    )
}

export default Catalog;