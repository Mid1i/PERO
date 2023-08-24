import useDraggableScroll from "use-draggable-scroll";
import {TailSpin} from "react-loader-spinner";
import {useParams} from "react-router-dom";
import {useRef} from "react";

import {fetchCurrentProduct, fetchRandomProducts} from "@api";
import {useRequest, useScroll} from "@hooks";
import { 
    Brands, 
    EmptyContent, 
    LoadingCard,
    Footer, 
    HeaderTop, 
    SearchBar,
    SignPopup, 
    SneakerCard, 
    SneakerInfo 
} from "@components";

import "./Product.style.scss";


export default function Product() {
    const params = useParams();
    const slider = useRef(null);
    
    const {data: currentItem, isError, isLoading} = useRequest(fetchCurrentProduct, ['currentItem', params.id]);
    const {data: items, isError: isErrorItems, isLoading: isLoadingItems} = useRequest(fetchRandomProducts, ['items', params.id])

    const {onMouseDown} = useDraggableScroll(slider);

    useScroll();


    return (
        <>
            <HeaderTop className='header mobile-off'/>
            <SearchBar className='search-bar mobile-off'/>
            <Brands className='brands mobile-off'/>
            <div className="content content--product">
                {isLoading ? (
                    <div className="loader">
                        <TailSpin ariaLabel='loading' color="#E47F46" height={100} width={100}/>
                    </div>
                ) : ((isError) ? (
                    <EmptyContent 
                        title='Товар не найден'
                        btn={true}
                    />
                ) : (
                    <>
                        <SneakerInfo {...currentItem}/> 
                        {!isErrorItems && (
                            <div className="extra-goods">
                                <h4 className="extra-goods__title">Смотрите также:</h4>
                                <div className="extra-goods__slider" ref={slider} onMouseDown={onMouseDown}>
                                    {isLoadingItems ? (
                                        <LoadingCard />
                                    ) : (items.length !== 0) && (
                                        items.filter(item => item.id !== currentItem.id).map((item) => (
                                            <SneakerCard 
                                                {...item} 
                                                key={item.id} 
                                            />)
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                ))}
            </div>
            <Footer className='footer mobile-off'/>

            <SignPopup />
        </>
    );
}
