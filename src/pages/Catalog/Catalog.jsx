import { useState, useEffect, useContext } from "react";
import { TailSpin } from 'react-loader-spinner';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { HeaderTop, SearchBar, Sorting, MainFilters, PriceFilters, Card, LoadingCard, EmptyContent, Footer } from "@components";
import { appContext, catalogContext } from "@services/Context";
import { useCatalogRequest, useScroll } from "@hooks";
import { filters } from "@utils/constants";

import "./Catalog.styles.scss";

import filtersIcon from "@assets/images/icons/filters-icon.svg";

//TODO: Верстка фильтров

function Catalog() {
    const { isMale } = useContext(appContext);

    const [link, setLink] = useState([]);
    const [emptyLink, setEmptyLink] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [params, setParams] = useState([]);
    const [openedFilters, setOpenedFilters] = useState("");
    
    const [items, loading, amount, colors, colorsLoading, fetching, error, colorsError] = useCatalogRequest(params);

    
    const { search } = useLocation();
    const navigate = useNavigate();
    useScroll();

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [isOpen])

    useEffect(() => {
        setParams(queryString.parse(search));

        queryString.parse(search)["search"] && onChangeLink("search", queryString.parse(search)["search"]);
    }, [search])

    function onChangeLink(id, item) {
        if (item && item !== "") {
            setLink(prev => [...prev.filter(el => !Object.keys(el).includes(id)), {[id]: item}]);
            (id === "fromPrice" && item < 3000) && setLink(prev => [...prev.filter(el => !Object.keys(el).includes(id)), {[id]: 3000}]);
            (id === "toPrice" && item > 50000) && setLink(prev => [...prev.filter(el => !Object.keys(el).includes(id)), {[id]: 50000}]);
        } else if (item === "") {
            setLink(prev => [...prev.filter(el => !Object.keys(el).includes(id))]);
        }
    }

    function onCloseFilters() {
        setIsOpen(!isOpen);

        link.length !== 0 ? navigate(`/catalog/?${formLink()}`) : navigate(`/catalog/`);
    }
    
    function formLink() {
        return `${link.map(item => `${Object.keys(item)}=${item[Object.keys(item)]}`)
                             .join('&')}`;
    }

    function onCancelFilters() {
        setEmptyLink(true);
        setLink([]);

        navigate("/catalog/");
    }

    function checkFiltersAmount() {
        let len = 0;
        link.map(item => len += String(item[Object.keys(item)[0]]).split(",").length);

        return params["search"] ? len - 1 : len;
    }

    
    return (
        <catalogContext.Provider value={{ emptyLink, params, openedFilters, setOpenedFilters, onChangeLink, formLink }}>
            <HeaderTop pageToLink={ "/" } pageToLinkName={ "Главная" } />
            <SearchBar onCancel={ true } />
            <div className="content">
                <div className="catalog">
                    <h2 className="catalog__title">
                        <span>{ isMale ? "Мужская обувь" : "Женская обувь" }</span>
                        <span>{ amount !== 0 ? `— ${amount}` : "" }</span>
                    </h2>
                    <div className="catalog__filters">
                        <Sorting />
                        <div className="catalog__filters-items filters-items">
                            { (!colorsLoading && !colorsError) ? filters.map((item, i) => <MainFilters 
                                                                            { ...item }
                                                                            elements = { item.id === "colors" ? colors : item.elements }
                                                                            key = { i }
                                                                        />)
                                : null }
                            <PriceFilters />
                        </div>
                        <div className="catalog__filters-mobile">
                            <div className="filters-mobile" onClick={ () => setIsOpen(!isOpen) } >
                                { checkFiltersAmount() === 0 ? <img src={ filtersIcon } alt="more" height={ 16 } width={ 16 } />       
                                    : <span className="filters-mobile__amount">{ checkFiltersAmount() }</span> 
                                }
                                <h6 className="filters-mobile__title">Фильтры</h6>
                            </div>
                            <div className="filters-mobile__blackout" style={ isOpen ? { visibility: "visible", opacity: 1 } : { visibility: "hidden", opacity: 0 } }>
                                <div className="filters-mobile__menu filters-menu" style={ isOpen ? { right: "0%" } : { right: "-100%" } }>
                                    <div className="filters-menu__top">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="#212121" onClick={ () => onCloseFilters() } >
                                            <path d="M20 8.75H4.7875L11.775 1.7625L10 0L0 10L10 20L11.7625 18.2375L4.7875 11.25H20V8.75Z" fill="#212121"/>
                                        </svg>
                                        <h4 className="filters-menu__top-title">Фильтры</h4>
                                        { link.length !== 0 ? <p className="filters-menu__top-cancel" onClick={ () => onCancelFilters() } >Сбросить</p> : null }
                                    </div>
                                    <div className="filters-menu__items">
                                        { (!colorsLoading && !colorsError) ? filters.map((item, i) => <MainFilters 
                                                                                    { ...item }
                                                                                    elements = { item.id === "colors" ? colors : item.elements }
                                                                                    key = { i }
                                                                                />)
                                        : null }
                                        <PriceFilters />
                                    </div>
                                    <button className="filters-menu__btn btn" onClick={ () => onCloseFilters() } >{ link.length === 0 ? "Показать все товары" : "Применить" }</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="goods">
                    <div className="goods__content">
                        { loading ? <LoadingCard /> 
                            : ((!items || error) ? <EmptyContent 
                                                        title = "Пока что все распродано"
                                                        text = "Но в ближайшее время ожидаются крупные поставки!"
                                                   />
                                : items.length === 0 ? <EmptyContent 
                                                            title = { params["search"] ? `По запросу  «${params["search"]}» ничего не найдено` : "Ничего не найдено" }
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