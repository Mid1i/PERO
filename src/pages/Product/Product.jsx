import useDraggableScroll from "use-draggable-scroll";
import {TailSpin} from "react-loader-spinner";
import {useParams} from "react-router-dom";
import {useRef} from "react";
import axios from "axios";

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
    const slider = useRef(null);
    const {onMouseDown} = useDraggableScroll(slider);
    
    useScroll();

    
    const fetchItems = () => axios.get(`https://java.pero-nn.ru/api/public/get_sneakers?page=${getRandomNumber(0, 1)}&size=10`);

    const fetchProduct = () => axios.get(`https://java.pero-nn.ru/api/public/get_sneaker/${params.id}`);

    const [product, errorProduct, loadingProduct] = useRequest(fetchProduct, 'item');
    const [items, errorItems, loadingItems] = useRequest(fetchItems, 'items');


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
                        {(items && !errorItems && !loadingItems && items.length !== 0) && (
                            <div className="extra-goods">
                                <h4 className="extra-goods__title">Смотрите также:</h4>
                                <div className="extra-goods__slider" ref={slider} onMouseDown={onMouseDown}>
                                    {items.filter(item => item.id !== product.id).map((item) => (
                                            <SneakerCard 
                                                {...item} 
                                                key={item.id} 
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                ))}
            </div>

            <Footer className='footer mobile-off'/>
        </>
    );
}
