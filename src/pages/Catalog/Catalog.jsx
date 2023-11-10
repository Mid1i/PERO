import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useReducer, useState} from "react";
import {useInView} from "react-intersection-observer";
import {TailSpin} from "react-loader-spinner";
import queryString from "query-string";
import classNames from "classnames";

import {useNoScroll, usePaginationRequest, useRequest, useScroll} from "@hooks";
import {toFormatAmountText, isPWA} from "@utils/helpers";
import {appContext, catalogContext} from "@services";
import {filters} from "@utils/constants";
import {fetchColors} from '@api';
import {
    AuthPopup, 
    Error,
    EmptyContent, 
    Footer, 
    Header, 
    LoadingCard,
    MainFilters,
    PageUp,
    PriceFilters, 
    SearchBar,
    SneakerCard, 
    Sorting
} from "@components";

import "./Catalog.style.scss";


export default function Catalog() {
    const {isMale, searchValue} = useContext(appContext);
    const [isOpen, setIsOpen] = useReducer(prev => !prev, false);
    const [isOpenSort, setIsOpenSort] = useState(false);
    const [params, setParams] = useState([]);
    const [amount, setAmount] = useState(0);
    const [link, setLink] = useState({});

    const {search} = useLocation();
    const navigate = useNavigate();

    const {data, error, fetchNextPage, isError, isFetchingNextPage, isLoading} = usePaginationRequest(isMale, search);
    const {data: colors, isError: isErrorColors, isLoading: isLoadingColors} = useRequest(fetchColors, 'colors');
    const {ref, inView} = useInView({threshold: 0.5})

    useScroll();
    useNoScroll(isOpen);


    useEffect(() => {
        if (isMale) {
            document.title = 'Мужские кроссовки и кеды — купить в интернет-магазине PERO';
        } else {
            document.title = 'Женские кроссовки и кеды — купить в интернет-магазине PERO';
        }
    }, [isMale])

    useEffect(() => {
        setAmount(0);
        setIsOpenSort(false);
        setParams(queryString.parse(search));
    }, [search])

    useEffect(() => {if (inView) fetchNextPage()}, [inView]) // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {setLink({...link, 'search': searchValue})}, [searchValue]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {for (let id in params) setLink({...link, [id]: params[`${id}`]})}, [params]) // eslint-disable-line react-hooks/exhaustive-deps


    const onClickFilters = () => {
        setIsOpen();
        setIsOpenSort(false);
    }

    const onFormLink = (link) => {
        let url = '';

        for (let id in link) {
            if (link[id] !== '') {
                url += `${id}=${link[id]}&`;
            }
        }

        if (url === '') {
            return url;
        } else {
            return `?${url.slice(0, -1)}`;
        }
    }

    const onFormTitle = () => {
        if (!isLoading && !isError && data.pages[0].amount !== 0) {
            return `${data.pages[0].amount} ${toFormatAmountText(data.pages[0].amount)}`;
        }
    }

    const onCancelFilters = () => {
        setLink({});
        setIsOpen();
        navigate("/catalog/");
    }

    const onCloseFilters = () => {
        setIsOpen();
        navigate(`/catalog/${onFormLink(link)}`);
    }

    
    return (
        <catalogContext.Provider value={{onFormLink, link, params, isOpenSort, setAmount, setIsOpenSort, setLink}}>
            <Header/>
            <SearchBar onCancel={true}/>
            <div className="content">
                {(isLoading || !isError) ? (
                    <>
                        {!isPWA() && (
                            <p className="content__nav">
                                <span className="content__nav-text" onClick={() => navigate('/')}>Главная</span>
                                <svg className="content__nav-icon" width="5" height="8" viewBox="0 0 5 8">
                                    <path d="M0.1912 0.176092C0.0687747 0.288878 1.23732e-07 0.441828 1.23732e-07 0.601308C1.23732e-07 0.760787 0.0687747 0.913737 0.1912 1.02652L3.42372 4.00363L0.1912 6.98074C0.0722443 7.09417 0.00642219 7.2461 0.00791007 7.40379C0.00939796 7.56149 0.0780767 7.71233 0.199154 7.82384C0.320232 7.93536 0.484021 7.99861 0.655245 7.99998C0.826468 8.00135 0.991425 7.94073 1.11459 7.83117L4.8088 4.42885C4.93123 4.31606 5 4.16311 5 4.00363C5 3.84415 4.93123 3.6912 4.8088 3.57842L1.11459 0.176092C0.992127 0.0633405 0.826055 0 0.652894 0C0.479733 0 0.313662 0.0633405 0.1912 0.176092Z" fill="#828282"/>
                                </svg>
                                <span className="content__nav-text" onClick={() => navigate('/catalog')}>Каталог</span>
                                <svg className="content__nav-icon" width="5" height="8" viewBox="0 0 5 8">
                                    <path d="M0.1912 0.176092C0.0687747 0.288878 1.23732e-07 0.441828 1.23732e-07 0.601308C1.23732e-07 0.760787 0.0687747 0.913737 0.1912 1.02652L3.42372 4.00363L0.1912 6.98074C0.0722443 7.09417 0.00642219 7.2461 0.00791007 7.40379C0.00939796 7.56149 0.0780767 7.71233 0.199154 7.82384C0.320232 7.93536 0.484021 7.99861 0.655245 7.99998C0.826468 8.00135 0.991425 7.94073 1.11459 7.83117L4.8088 4.42885C4.93123 4.31606 5 4.16311 5 4.00363C5 3.84415 4.93123 3.6912 4.8088 3.57842L1.11459 0.176092C0.992127 0.0633405 0.826055 0 0.652894 0C0.479733 0 0.313662 0.0633405 0.1912 0.176092Z" fill="#828282"/>
                                </svg>
                                <span className="content__nav-text" onClick={() => navigate(`/catalog/?isMale=${isMale ? 'true' : 'false'}`)}>{isMale ? 'Мужчинам' : 'Женщинам'}</span>
                            </p>
                        )}
                        <h2 className="content__amount">
                            <span className="content__amount-title">{isMale ? 'Мужская обувь' : 'Женская обувь'}</span>
                            <span className="content__amount-number">{onFormTitle()}</span>
                        </h2>
                        <div className="content__filters">
                            <Sorting/>
                            <p className="content__filters-items filters" onClick={() => onClickFilters()}>
                                <span className="filters__title">Фильтры</span>
                                <svg className="filters__icon" width="24" height="19" viewBox="0 0 24 19">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.255 3.16925C3.5649 2.24254 4.13961 1.44006 4.8999 0.87244C5.66019 0.304819 6.56863 0 7.5 0C8.43137 0 9.33981 0.304819 10.1001 0.87244C10.8604 1.44006 11.4351 2.24254 11.745 3.16925H22.5C22.8978 3.16925 23.2794 3.336 23.5607 3.63281C23.842 3.92962 24 4.33218 24 4.75194C24 5.17169 23.842 5.57426 23.5607 5.87107C23.2794 6.16788 22.8978 6.33463 22.5 6.33463H11.745C11.4351 7.26134 10.8604 8.06382 10.1001 8.63144C9.33981 9.19906 8.43137 9.50388 7.5 9.50388C6.56863 9.50388 5.66019 9.19906 4.8999 8.63144C4.13961 8.06382 3.5649 7.26134 3.255 6.33463H1.5C1.10218 6.33463 0.720645 6.16788 0.43934 5.87107C0.158036 5.57426 0 5.17169 0 4.75194C0 4.33218 0.158036 3.92962 0.43934 3.63281C0.720645 3.336 1.10218 3.16925 1.5 3.16925H3.255ZM7.5 3.16925C7.10218 3.16925 6.72064 3.336 6.43934 3.63281C6.15804 3.92962 6 4.33218 6 4.75194C6 5.17169 6.15804 5.57426 6.43934 5.87107C6.72064 6.16788 7.10218 6.33463 7.5 6.33463C7.89782 6.33463 8.27936 6.16788 8.56066 5.87107C8.84196 5.57426 9 5.17169 9 4.75194C9 4.33218 8.84196 3.92962 8.56066 3.63281C8.27936 3.336 7.89782 3.16925 7.5 3.16925Z" fill="#1F1F21"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.255 12.6654C12.5649 11.7387 13.1396 10.9362 13.8999 10.3686C14.6602 9.80094 15.5686 9.49612 16.5 9.49612C17.4314 9.49612 18.3398 9.80094 19.1001 10.3686C19.8604 10.9362 20.4351 11.7387 20.745 12.6654H22.5C22.8978 12.6654 23.2794 12.8321 23.5607 13.1289C23.842 13.4257 24 13.8283 24 14.2481C24 14.6678 23.842 15.0704 23.5607 15.3672C23.2794 15.664 22.8978 15.8307 22.5 15.8307H20.745C20.4351 16.7575 19.8604 17.5599 19.1001 18.1276C18.3398 18.6952 17.4314 19 16.5 19C15.5686 19 14.6602 18.6952 13.8999 18.1276C13.1396 17.5599 12.5649 16.7575 12.255 15.8307H1.5C1.10218 15.8307 0.720645 15.664 0.43934 15.3672C0.158036 15.0704 0 14.6678 0 14.2481C0 13.8283 0.158036 13.4257 0.43934 13.1289C0.720645 12.8321 1.10218 12.6654 1.5 12.6654H12.255ZM16.5 12.6654C16.1022 12.6654 15.7206 12.8321 15.4393 13.1289C15.158 13.4257 15 13.8283 15 14.2481C15 14.6678 15.158 15.0704 15.4393 15.3672C15.7206 15.664 16.1022 15.8307 16.5 15.8307C16.8978 15.8307 17.2794 15.664 17.5607 15.3672C17.842 15.0704 18 14.6678 18 14.2481C18 13.8283 17.842 13.4257 17.5607 13.1289C17.2794 12.8321 16.8978 12.6654 16.5 12.6654Z" fill="#1F1F21"/>
                                </svg>
                                <span className={classNames("filters__amount", amount !== 0 && "active")}>{amount}</span>
                            </p>
                            <div className={classNames("filters__blackout blackout", isOpen && "active")}>
                                <div className={classNames("filters__blackout-items filters-items", isOpen && "active")}>
                                    <div className="filters-items__top">
                                        <svg
                                            className="filters-items__top-icon"
                                            onClick={() => onCloseFilters()}
                                            height="14" 
                                            viewBox="0 0 15 14" 
                                            width="15" 
                                        >
                                            <path d="M7.02799 14C6.84933 14.0002 6.67729 13.9324 6.54733 13.8102L0.198888 7.48326C-0.0662958 7.21853 -0.0662958 6.78983 0.198888 6.52519L6.54733 0.198281C6.81287 -0.0660936 7.24312 -0.0660936 7.50866 0.198281C7.63835 0.324186 7.71145 0.496911 7.71145 0.677319C7.71145 0.857726 7.63835 1.03045 7.50866 1.15635L1.64996 7.01326L7.49959 12.8431C7.62928 12.969 7.70238 13.1417 7.70238 13.3221C7.70238 13.5025 7.62928 13.6752 7.49959 13.8011C7.3767 13.9295 7.20602 14.0015 7.02799 14Z" fill="black"/>
                                            <path d="M14.3196 7.68947H0.715834C0.340188 7.68947 0.0356445 7.38632 0.0356445 7.0124C0.0356445 6.63847 0.340188 6.33533 0.715834 6.33533H14.3196C14.6953 6.33533 14.9998 6.63847 14.9998 7.0124C14.9998 7.38632 14.6953 7.68947 14.3196 7.68947Z" fill="black"/>
                                            <path d="M7.02799 14C6.84933 14.0002 6.67729 13.9324 6.54733 13.8102L0.198888 7.48326C-0.0662958 7.21853 -0.0662958 6.78983 0.198888 6.52519L6.54733 0.198281C6.81287 -0.0660936 7.24312 -0.0660936 7.50866 0.198281C7.63835 0.324186 7.71145 0.496911 7.71145 0.677319C7.71145 0.857726 7.63835 1.03045 7.50866 1.15635L1.64996 7.01326L7.49959 12.8431C7.62928 12.969 7.70238 13.1417 7.70238 13.3221C7.70238 13.5025 7.62928 13.6752 7.49959 13.8011C7.3767 13.9295 7.20602 14.0015 7.02799 14Z" fill="black"/>
                                            <path d="M14.3196 7.68947H0.715834C0.340188 7.68947 0.0356445 7.38632 0.0356445 7.0124C0.0356445 6.63847 0.340188 6.33533 0.715834 6.33533H14.3196C14.6953 6.33533 14.9998 6.63847 14.9998 7.0124C14.9998 7.38632 14.6953 7.68947 14.3196 7.68947Z" fill="black"/>
                                        </svg>
                                        <h4 className="filters-items__top-title">Фильтры</h4>
                                        <p className={classNames("filters-items__top-cancel", onFormLink(link) !== '' && "active")} onClick={() => onCancelFilters()}>Сбросить</p>
                                    </div>
                                    <div className="filters-items__section">
                                        {(!isLoadingColors && !isErrorColors) && (
                                            <>
                                                {filters.map((filter, index) => (
                                                    <MainFilters                                
                                                        {...filter}
                                                        elements={filter.id === 'colors' ? colors : filter.elements}
                                                        key={index}
                                                    />
                                                ))}
                                                <PriceFilters/>
                                            </>
                                        )}
                                    </div>
                                    <button className="filters-items__btn" onClick={() => onCloseFilters()}>
                                        {onFormLink(link) === '' ? 'Показать все товары' : 'Применить'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="content__catalog">
                            {isLoading ? <LoadingCard page='catalog'/> : (data.pages[0].page.content.length === 0) ? (
                                <EmptyContent title={searchValue ? `По запросу  «${searchValue}» ничего не найдено` : 'Ничего не найдено'}/>
                            ) : (
                                data.pages.map(itemsPage => itemsPage.page.content.map(item => (
                                    <SneakerCard
                                        key={item.id}
                                        page='catalog'
                                        {...item}
                                    />)
                                )
                            ))}
                            {isFetchingNextPage && (
                                <div className="loader--catalog">
                                    <TailSpin ariaLabel='loading' color="#E47F46" height={80} width={80}/>
                                </div>
                            )}
                        </div>
                    </>
                ) : <Error status={error.response?.status || 404}/>}
            </div>
            <Footer activePage='catalog' footerRef={ref}/>
            
            <PageUp/>
            <AuthPopup/>
        </catalogContext.Provider>
    );
}
