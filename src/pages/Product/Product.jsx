import React from 'react';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';

import { Header, SearchBar, Brands, Sneaker, Card, EmptyContent, Footer } from "@components";
import ScrollToTop from '@utils/helpers/scroll.helper';

import "./Product.styles.scss";

function Product() {
    const [items, setItems] = React.useState([]);
    const [item, setItem] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    const params = useParams();

    React.useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);

                const itemsResponse = await axios.get("https://java.pero-nn.ru/api/public/get_sneakers?page=0&size=6");
                const itemResponse = await axios.get(`https://java.pero-nn.ru/api/public/get_sneaker/${params.id}`);

                setItems(itemsResponse.data.content);
                setItem(itemResponse.data);

            } catch(error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [params]);

    return (<>
        <ScrollToTop />
        <Header className={ "header mobile-off" } />
        <SearchBar className={ "search-bar mobile-off" } />
        <Brands className={ "brands mobile-off" } />

        <div className="content content--product">
            { !isLoading ? (Object.keys(item).length !== 0) ? 
                <>
                    <Sneaker item={ item } /> 
                    { items.length !== 0 ?
                        <>
                            <div className="extra-goods">
                                <h4 className="extra-goods__title">Смотрите также:</h4> 
                                <div className="extra-goods__scroll">
                                    { items.length !== 0 && items.filter(obj => Number(obj.id) !== Number(item.id)).map((obj, i) => {
                                        return ( 
                                            <Card item = { obj } key = { i } />
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                    : null }
                </>
                : <EmptyContent 
                    title ="Товар не найден"
                    btn
                />
            :   
            <div className="loader">
                <TailSpin color="#E47F46" height={100} width={100} ariaLabel='loading' />
            </div> }
        </div>

        <Footer className={ "footer mobile-off" } />
    </>)
}

export default Product;