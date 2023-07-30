import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Header, SearchBar, Brands, Sneaker, Card, Footer } from "@components";

import "./Product.styles.scss";

function Product() {
    const [items, setItems] = React.useState([]);
    const [item, setItem] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    const params = useParams();

    React.useEffect(() => {
        async function fetchData() {
            try {
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
        <Header className={ "header mobile-off" } />
        <SearchBar className={ "search-bar mobile-off" } />
        <Brands className={ "brands mobile-off" } />

        <div className="content">
            { !isLoading && <Sneaker item={ item } /> }
            
            <div className="extra-goods">
                <div className="scroll">
                    { items.length !== 0 && items.filter(obj => Number(obj.id) !== Number(item.id)).map((obj, i) => {
                        return ( 
                            <Card item = { obj } key = { i } />
                        )
                    })}
                </div>
            </div>
        </div>

        <Footer className={ "footer mobile-off" } />
    </>)
}

export default Product;