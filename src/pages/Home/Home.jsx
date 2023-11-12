import {useNavigate} from "react-router-dom";
import {isMobile} from "react-device-detect";
import {useContext, useEffect} from "react";
import Slider from "react-slick";

import {useRequest, useScroll} from "@hooks";
import {appContext} from "@services/Context";
import {settings} from "@utils/constants";
import {isPWA} from "@utils/helpers";
import {fetchProducts} from "@api";
import {
    AuthPopup,
    Brands,
    Error,
    Footer, 
    GoodsSlider,
    InstallSlider, 
    Header, 
    LoadingCard, 
    PageUp,
    SearchBar, 
    SneakerCard 
} from "@components";

import "./Home.style.scss";

import peroIcon from "@assets/images/home-images/pero-icon.png";
import mobilePhone from "@assets/images/home-images/pero-mobile--phone.png";


export default function Home() {
    const {requestData: {data, error, status}} = useRequest(fetchProducts);
    const {setInstallPopup} = useContext(appContext);
    const navigate = useNavigate();

    useScroll();

    useEffect(() => {document.title = 'Купить мужскую и женскую обувь в интернет-магазине PERO'}, []);

    
    const onClickDownloadBanner = () => {if (isMobile) setInstallPopup();}


    const sliderRender = (from, to) => {
        return (
            <Slider {...settings} className="content__goods-slider">
                {data.slice(from, to).map((item) => (<SneakerCard key={item.id} {...item}/>))}
            </Slider>
        );
    }


    return (
        <>
            <Header/>
            <SearchBar/>
            <div className="content">
                {(status === 'loading' || (!!data)) ? (
                    <>
                        <GoodsSlider/>
                        <div className="content__popular">
                            <h4 className="content__popular-left">
                                <span>Наиболее популярные</span>
                                <svg height="24" viewBox="0 0 18 24" width="18">
                                    <path d="M9.06412 0L7.3028 3.47531C6.0443 5.95805 4.35742 8.21613 2.31455 10.1529L2.08314 10.3639C0.771152 11.5936 0.0215016 13.2778 0.000417282 15.0431V15.2665C-0.0342948 18.7234 2.09934 21.8573 5.40007 23.1977L5.73433 23.3342C7.89921 24.2219 10.3447 24.2219 12.5096 23.3342H12.5867C15.9122 21.9394 18.0458 18.7541 17.9993 15.2541V9.8674C16.891 12.3107 14.8785 14.2669 12.3553 15.3534C12.3553 15.3534 12.3553 15.3534 12.2782 15.3534C12.2011 15.3534 11.3011 15.7134 10.9154 15.3534C10.571 15.0169 10.538 14.4861 10.8383 14.1122L10.9283 14.0502H10.9926C13.9441 11.8843 14.6322 7.8712 12.561 4.90267C10.8897 2.44513 9.06412 0 9.06412 0Z" fill="#E47F46"/>
                                </svg>
                            </h4>
                            <h5 className="content__popular-right" onClick={() => navigate('/catalog/')}>Больше кроссовок</h5>
                        </div>
                        <div className="content__goods">
                            {status === 'loading' ? (
                                <Slider {...settings}>
                                    <LoadingCard/>
                                </Slider>
                            ) : ((data.length / 2 > 6) ? (
                                <>
                                    {sliderRender(0, data.length / 2)}
                                    {sliderRender(data.length / 2, data.length)}
                                </>
                            ) : (
                                <div className="content__goods-scroll">
                                    {data.map((item) => (<SneakerCard key={item.id} {...item}/>))}
                                </div>
                            ))}
                            <div className="content__goods-back"></div>
                        </div>
                        {!isPWA() && (
                            <div className="content__download" onClick={onClickDownloadBanner}>
                                <div className="content__download-left download-left">
                                    <h4 className="download-left__title">
                                        <span className="download-left__title-text">Pero mobile</span>
                                        <img alt="Pero" className="download-left__title-image" src={peroIcon}/>
                                    </h4>    
                                    <p className="download-left__text download-left__text--first">Новые возможности в <span>новом приложении</span></p>
                                    <p className="download-left__text download-left__text--second">Скачивай и заказывай в приложении <span>PERO Mobile</span></p>
                                </div>
                                <div className="content__download__right download-right">
                                    <img alt="Mobile phone" className="download-right__image" src={mobilePhone}/>
                                </div>
                            </div>
                        )}
                        <Brands/>
                    </>
                ) : <Error status={error?.response?.status || 502}/>}
            </div>
            <Footer activePage='home'/>
            
            <PageUp/>
            <AuthPopup/>
            <InstallSlider/>
        </>
    );
}
