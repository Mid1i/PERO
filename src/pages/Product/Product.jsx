import {TailSpin} from "react-loader-spinner";
import {useParams} from "react-router-dom";

import {useRequest, useScroll} from "@hooks";
import {fetchCurrentProduct} from "@api";
import { 
    Brands, 
    EmptyContent, 
    Footer, 
    InstallSlider,
    HeaderTop, 
    SearchBar,
    SignPopup,
    SneakerSlider, 
    SneakerInfo 
} from "@components";

import "./Product.style.scss";


export default function Product() {
    const params = useParams();
    
    const {data: currentItem, isError, isLoading} = useRequest(fetchCurrentProduct, ['currentItem', params.id]);

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
                        <SneakerSlider id={currentItem.id} title='Смотрите также:'/>
                    </>
                ))}
            </div>
            <Footer className='footer mobile-off'/>

            <InstallSlider />
            <SignPopup />
        </>
    );
}
