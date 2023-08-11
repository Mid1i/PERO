import {useLocation, useNavigate} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import {TailSpin} from "react-loader-spinner";
import queryString from "query-string";
import classNames from 'classnames';
import axios from 'axios';

import {appContext, catalogContext} from "@services/Context";
import {useCatalogRequest, useRequest, useScroll} from "@hooks";
import {filters} from "@utils/constants";
import {
    EmptyContent, 
    Footer, 
    HeaderTop, 
    LoadingCard, 
    MainFilters, 
    PriceFilters, 
    SearchBar, 
    SneakerCard, 
    Sorting
} from "@components";

import "./Catalog.style.scss";

import {filtersIcon} from "@assets/images";


export default function Catalog() {
    const {isMale, searchValue} = useContext(appContext);

    const [emptyLink, setEmptyLink] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [link, setLink] = useState([]);
    const [openedFilters, setOpenedFilters] = useState('');
    const [params, setParams] = useState([]);
    
    const {search} = useLocation();

    const navigate = useNavigate();

    useScroll();

    useEffect(() => {
        isOpen ? document.body.classList.add("no-scroll") : document.body.classList.remove("no-scroll");
    }, [isOpen])

    useEffect(() => {
        searchValue === '' && onChangeLink('search', '');
    }, [searchValue])

    useEffect(() => {
        setOpenedFilters('');

        const searchParams = queryString.parse(search);
        
        setParams(searchParams);
        searchParams.search && onChangeLink('search', searchParams.search);
    }, [search])


    const fetchColors = () => axios.get('https://java.pero-nn.ru/api/public/get_colors');

    const formLink = () => `${link.map(item => `${Object.keys(item)}=${item[Object.keys(item)]}`).join('&')}`;

    const checkFiltersAmount = () => {
        let len = 0;
        link.map(item => len += String(item[Object.keys(item)[0]]).split(',').length);

        if (params['search'] && params['sort']) {
            return len - 3;
        } else if (params['sort']) {
            return len - 2;
        } else if (params['search']) {
            return len - 1;
        } else {
            return len;
        }
    }

    const onCancelFilters = () => {
        setEmptyLink(true);
        setLink([]);

        navigate("/catalog/");
    }

    const onChangeLink = (id, item) => {
        if (item && item !== '') {
            setLink(prev => [...prev.filter(el => !Object.keys(el).includes(id)), {[id]: item}]);
            (id === 'fromPrice' && item < 3000) && setLink(prev => [...prev.filter(el => !Object.keys(el).includes(id)), {[id]: 3000}]);
            (id === 'toPrice' && item > 50000) && setLink(prev => [...prev.filter(el => !Object.keys(el).includes(id)), {[id]: 50000}]);
        } else if (item === '') {
            setLink(prev => [...prev.filter(el => !Object.keys(el).includes(id))]);
        }
    }

    const onCloseFilters = () => {
        setIsOpen(prev => !prev);

        link.length !== 0 ? navigate(`/catalog/?${formLink()}`) : navigate(`/catalog/`);
    }
    
    const filtersRender = () => {
        return (
            <>
                {filters.map((filter, index) => (
                        <MainFilters                                
                            {...filter}
                            elements={filter.id === 'colors' ? colors : filter.elements}
                            key={index}
                        />
                    )
                )}
                <PriceFilters />
            </>
        );
    }

    const [items, loading, amount, fetching, error] = useCatalogRequest(search);
    const [colors, errorColors, loadingColors] = useRequest(fetchColors, 'colors');

    const contextData = {
        emptyLink, 
        formLink, 
        onChangeLink, 
        openedFilters, 
        params, 
        setOpenedFilters,
    };
    
    
    return (
        <catalogContext.Provider value={{...contextData}}>
            <HeaderTop pageToLink={'/'} pageToLinkName={'Главная'}/>
            <SearchBar onCancel={true}/>
            <div className="content">
                <div className="catalog">
                    <h2 className="catalog__title">
                        <span>{isMale ? 'Мужская обувь' : 'Женская обувь'}</span>
                        <span>{amount !== 0 && `— ${amount}`}</span>
                    </h2>
                    <div className="catalog__filters">
                        <Sorting />
                        <div className="catalog__filters-items filters-items">
                            {(!loadingColors && !errorColors && colors) && filtersRender()}
                        </div>
                        <div className="catalog__filters-mobile">
                            <div className="filters-mobile" onClick={() => setIsOpen(prev => !prev)}>
                                {checkFiltersAmount() <= 0 ? <img src={filtersIcon} alt="more" height={16} width={16}/>       
                                    : <span className="filters-mobile__amount">{checkFiltersAmount()}</span> 
                                }
                                <h6 className="filters-mobile__title">Фильтры</h6>
                            </div>
                            <div className={classNames("filters-mobile__blackout blackout", isOpen && "active")}>
                                <div className={classNames("filters-mobile__menu filters-menu", isOpen && "active")}>
                                    <div className="filters-menu__top">
                                        <svg 
                                            fill="#212121" 
                                            onClick={() => onCloseFilters()}
                                            height="20" 
                                            viewBox="0 0 20 20" 
                                            width="20" 
                                        >
                                            <path d="M20 8.75H4.7875L11.775 1.7625L10 0L0 10L10 20L11.7625 18.2375L4.7875 11.25H20V8.75Z" fill="#212121"/>
                                        </svg>
                                        <h4 className="filters-menu__top-title">Фильтры</h4>
                                        {link.length !== 0 && (
                                            <p 
                                                className="filters-menu__top-cancel" 
                                                onClick={() => onCancelFilters()}
                                            >
                                                Сбросить</p>
                                        )}
                                    </div>
                                    <div className="filters-menu__items">
                                        {(!loadingColors && !errorColors && colors) && filtersRender()}
                                    </div>
                                    <button className="filters-menu__btn btn" onClick={() => onCloseFilters()}>
                                        {link.length === 0 ? 'Показать все товары' : 'Применить'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="goods">
                    <div className="goods__content">
                        {loading ? <LoadingCard /> : ((!items || error) ? (
                                <EmptyContent 
                                    title='Пока что все распродано'
                                    text='Но в ближайшее время ожидаются крупные поставки!'
                                />
                            ) : items.length === 0 ? (
                                <EmptyContent 
                                    title={params["search"] ? `По запросу  «${params['search']}» ничего не найдено` : 'Ничего не найдено'}
                                />
                            ) : items.map((item) => (
                                    <SneakerCard 
                                        className='margin'
                                        key={item.id}
                                        {...item}
                                    />
                                )
                            )   
                        )}
                    </div>
                    {fetching && (
                            <div className="loader--catalog">
                                <TailSpin ariaLabel='loading' color="#E47F46" height={80} width={80}/>
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer />
        </catalogContext.Provider>
    );
}
