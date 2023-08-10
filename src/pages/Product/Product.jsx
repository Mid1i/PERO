import {TailSpin} from "react-loader-spinner";
import {useParams} from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";

import {similarItemsSliderSettings as settings} from "@utils/constants";
import {getRandomNumber} from "@utils/helpers";
import {useRequest, useScroll} from "@hooks";
import { 
    Brands, 
    EmptyContent, 
    Footer, 
    HeaderTop, 
    SearchBar, 
    SneakerCard, 
    SneakerInfo 
} from "@components";

import "./Product.style.scss";


export default function Product() {
    const params = useParams();
    
    useScroll();

    
    const fetchItems = () => axios.get(`https://java.pero-nn.ru/api/public/get_sneakers?page=${getRandomNumber(0, 1)}&size=10`);

    const fetchProduct = () => axios.get(`https://java.pero-nn.ru/api/public/get_sneaker/${params.id}`);

    const [product, loadingProduct, errorProduct] = useRequest(fetchProduct, 'item');
    const [items, loadingItems, errorItems] = useRequest(fetchItems, 'items');


    return (
        <>
            <HeaderTop className='header mobile-off'/>
            <SearchBar className='search-bar mobile-off'/>
            <Brands className='brands mobile-off'/>

            <div className="content content--product">
                {loadingProduct ? (
                    <div className="loader">
                        <TailSpin ariaLabel='loading' color="#E47F46" height={100} width={100}/>
                    </div>
                ) : ((!product || errorProduct) ? (
                    <EmptyContent 
                        title='Товар не найден'
                        btn={true}
                    />
                ) : (
                    <>
                        <SneakerInfo {...product}/> 
                        {!!(items && !errorItems && !loadingItems) && (
                            <div className="extra-goods">
                                <h4 className="extra-goods__title">Смотрите также:</h4> 
                                <Slider {...settings}>
                                    {items.filter(item => item.id !== product.id).map((item) => (
                                            <SneakerCard 
                                                {...item} 
                                                key={item.id} 
                                            />
                                        )
                                    )}
                                </Slider>
                            </div>
                        )}
                    </>
                ))}
            </div>

            <Footer className='footer mobile-off'/>
        </>
    );
}
