import {TailSpin} from "react-loader-spinner";
import {useParams} from "react-router-dom";

import {fetchCurrentProduct, fetchRandomGenderProducts} from "@api";
import {useRequest, useScroll} from "@hooks";
import { 
    Brands, 
    Error,
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
    
    const {data: currentItem, error, isError, isLoading} = useRequest(fetchCurrentProduct, ['currentItem', params.id]);

    useScroll();


    return (
        <>
            <HeaderTop className='header mobile-off'/>
            <SearchBar className='search-bar mobile-off'/>
            <Brands className='brands mobile-off'/>
            <div className="content content--product">
                {(isLoading || (!isError)) ? (isLoading) ? (
                    <div className="loader">
                        <TailSpin ariaLabel='loading' color="#E47F46" height={100} width={100}/>
                    </div>
                ) : (
                    <>
                        <SneakerInfo {...currentItem}/> 
                        <SneakerSlider id={currentItem.id} title='Смотрите также:' male={currentItem.male} func={fetchRandomGenderProducts}/>
                    </>
                ) : <Error status={error.response.status}/>}
            </div>
            <Footer className='footer mobile-off'/>

            <InstallSlider />
            <SignPopup />
        </>
    );
}
