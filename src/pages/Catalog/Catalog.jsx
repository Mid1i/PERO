import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {TailSpin} from "react-loader-spinner";
import queryString from "query-string";
import classNames from "classnames";

import {useNoScroll, usePaginationRequest, useRequest, useScroll} from "@hooks";
import {appContext, catalogContext} from "@services/Context";
import {filters} from "@utils/constants";
import {isPWA} from "@utils/helpers";
import {fetchColors} from '@api';
import {
    EmptyContent, 
    Footer, 
    HeaderTop, 
    LoadingCard,
    LoadingFilters, 
    MainFilters, 
    PriceFilters, 
    SearchBar,
    SignPopup, 
    SneakerCard, 
    Sorting
} from "@components";

import "./Catalog.style.scss";

import {filtersIcon} from "@assets/images";


export default function Catalog() {
    const {isMale, searchValue} = useContext(appContext);

    const [emptyLink, setEmptyLink] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [link, setLink] = useState({});
    const [openedFilters, setOpenedFilters] = useState('');
    const [params, setParams] = useState([]);
    
    const {search} = useLocation();

    const navigate = useNavigate();

    const {
        data,
        fetchNextPage,
        isError,
        isFetchingNextPage,
        isLoading
    } = usePaginationRequest(isMale, search);

    const {data: colors, isError: isErrorColors, isLoading: isLoadingColors} = useRequest(fetchColors, 'colors');

    useScroll();
    useNoScroll(isOpen);
    

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
 
        return function() {
            window.removeEventListener('scroll', scrollHandler);
        }
    })

    useEffect(() => {
        if (isMale) {
            document.title = 'Мужские кроссовки и кеды — купить в интернет-магазине PERO';
        } else {
            document.title = 'Женские кроссовки и кеды — купить в интернет-магазине PERO';
        }
    }, [isMale])

    useEffect(() => {
        if (searchValue === '') {
            onChangeLink('search', '');
        }
    }, [searchValue]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setOpenedFilters('');

        const searchParams = queryString.parse(search);
        
        setParams(searchParams);
        if (searchParams.search) {
            onChangeLink('search', searchParams.search);
        }
    }, [search]) // eslint-disable-line react-hooks/exhaustive-deps


    const formLink = () => {
        let stringLink = '';

        for (let id in link) {
            if (link[id] !== '') {
                stringLink += `${id}=${link[id]}&`;
            }
        }

        if (stringLink.slice(-1) === '&') {
            return stringLink.slice(0, -1);
        } else {
            return stringLink;
        }
    }

    const checkFiltersAmount = () => {
        let len = 0;
        for (let id in link) {
            if (link[id] !== '') {
                len += link[id].length;
            }
        }

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
        setLink({});

        navigate("/catalog/");
    }
    
    const onChangeLink = (id, item) => {
        if (item && item !== '') {
            setLink({...link, [id]: item});
        } else if (item === '') {
            setLink({...link, [id]: ''});
        }
    }

    const onCloseFilters = () => {
        setIsOpen(prev => !prev);

        if (formLink().length !== 0) {
            navigate(`/catalog/?${formLink()}`)
        } else {
            navigate(`/catalog/`);
        }
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

    const scrollHandler = () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 200 && !isLoading) {
            fetchNextPage();
        }
    }

    const contextData = {
        emptyLink, 
        formLink, 
        onChangeLink, 
        openedFilters, 
        params, 
        setOpenedFilters,
    }
    
    
    return (
        <catalogContext.Provider value={{...contextData}}>
            <HeaderTop pageToLink={'/'} pageToLinkName={'Главная'}/>
            <SearchBar onCancel={true}/>
            <div className="content">
                <div className="catalog">
                    <h2 className="catalog__title">
                        <span>{isMale ? 'Мужская обувь' : 'Женская обувь'}</span>
                        <span>{(!isLoading && !isError) && (data.pages[0].amount !== 0 && `— ${data.pages[0].amount}`)}</span>
                    </h2>
                    <div className="catalog__filters">
                        <Sorting />
                        <div className="catalog__filters-items filters-items">
                            {isLoadingColors ? <LoadingFilters/> : (!isErrorColors && filtersRender())}
                        </div>
                        <div className="catalog__filters-mobile">
                            <div className="filters-mobile" onClick={() => setIsOpen(prev => !prev)}>
                                {checkFiltersAmount() <= 0 ? <img src={filtersIcon} alt="more" height={16} width={16}/>       
                                    : <span className="filters-mobile__amount">{`${checkFiltersAmount()}`}</span> 
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
                                        {(!isLoadingColors && !isErrorColors) && filtersRender()}
                                    </div>
                                    <button className="filters-menu__btn btn" onClick={() => onCloseFilters()}>
                                        {link.length === 0 ? 'Показать все товары' : 'Применить'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classNames("goods", isPWA() && "goods--mobile")}>
                    <div className="goods__content">
                        {isLoading ? <LoadingCard /> : (isError ? (
                                <EmptyContent 
                                    title='Пока что все распродано'
                                    text='Но в ближайшее время ожидаются крупные поставки!'
                                />
                            ) : (data.pages[0].page.content.length === 0) ? (
                                <EmptyContent 
                                    title={params["search"] ? `По запросу  «${params['search']}» ничего не найдено` : 'Ничего не найдено'}
                                />
                            ) : data.pages.map(itemsPage => itemsPage.page.content.map(item => (
                                    <SneakerCard
                                        key={item.id}
                                        {...item}
                                    />)
                                )
                            )   
                        )}
                    </div>
                    {isFetchingNextPage && (
                            <div className="loader--catalog">
                                <TailSpin ariaLabel='loading' color="#E47F46" height={80} width={80}/>
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer activePage='catalog'/>

            <SignPopup />
        </catalogContext.Provider>
    );
}
