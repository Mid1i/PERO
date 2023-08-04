// import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';

import { Header, SearchBar, Brands, Sneaker, Card, LoadingCard, EmptyContent, Footer } from "@components";
import { getRandomNumber } from '@utils/helpers';
import { useRequest, useScroll } from '@hooks';

import "./Product.styles.scss";


function Product() {
    const params = useParams();
    useScroll();

    const [currentItem, loadingItem] = useRequest(fetchCurrentItem, "item");
    const [similarItems, loadingItems] = useRequest(fetchSimilarItems, "items");
    
    function fetchSimilarItems() {
        return axios.get(`https://java.pero-nn.ru/api/public/get_sneakers?page=${getRandomNumber(0, 1)}&size=10`);
    }

    function fetchCurrentItem() {
        return axios.get(`https://java.pero-nn.ru/api/public/get_sneaker/${params.id}`);
    }


    return (<>
        <Header className={ "header mobile-off" } />
        <SearchBar className={ "search-bar mobile-off" } />
        <Brands className={ "brands mobile-off" } />

        <div className="content content--product">
            { loadingItem ? <div className="loader">
                                <TailSpin color="#E47F46" height={100} width={100} ariaLabel='loading' />
                            </div>
                            
                : (!currentItem ? <EmptyContent 
                                                    title ="Товар не найден"
                                                    btn
                                                 />
                    : <>
                        <Sneaker item={ currentItem } /> 
                        { loadingItems ? <LoadingCard />
                            : similarItems ? <div className="extra-goods">
                                                <h4 className="extra-goods__title">Смотрите также:</h4> 
                                                <div className="extra-goods__scroll">
                                                    { similarItems.filter(obj => Number(obj.id) !== Number(currentItem.id))
                                                                    .map((obj, i) => <Card 
                                                                                        item = { obj } 
                                                                                        key = { i } 
                                                                                />)
                                                    }
                                                </div>
                                             </div>
                                : null
                        }
                      </>

            )}
        </div>

        <Footer className={ "footer mobile-off" } />
    </>)
}

export default Product;