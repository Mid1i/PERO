import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";

// import {installPWA} from "../../serviceWorker";
import {useRequest, useScroll} from "@hooks";
import {appContext} from "@services/Context";
import {isPWA} from "@utils/helpers";
import {fetchProducts} from "@api";
import { 
    Brands, 
    EmptyContent, 
    Footer, 
    GoodsSlider, 
    HeaderTop, 
    LoadingCard, 
    SearchBar, 
    SignPopup,
    SneakerCard 
} from "@components";

import "./Home.style.scss";

import maleImage from "@assets/images/gender-images/1.jpg";
import femaleImage from "@assets/images/gender-images/2.jpg";
import classNames from "classnames";


export default function Home() {
    const {setIsMale} = useContext(appContext);
    
    const {data: items, isError, isLoading} = useRequest(fetchProducts);

    const navigate = useNavigate();

    useScroll();

    
    useEffect(() => {
        document.title = 'Купить мужскую и женскую обувь в интернет-магазине PERO';
    }, [])


    const onChooseGender = (gender) => {
        setIsMale(gender);
        navigate('/catalog/');
    }


    return (
        <>
            <HeaderTop />
            <SearchBar />
            <Brands />
            <div className="content content--home">
                <GoodsSlider />
                <div className="goods">
                    {/*<button className="add-button" onClick={() => installPWA()}>click</button>*/}
                    <div className="goods__title">
                        <h4 className="goods__title-left">Наиболее популярные</h4>
                        <h5 className="goods__title-right" onClick={() => navigate('/catalog/')}>
                            <span>Больше кроссовок</span>
                            <svg width="24" height="19" viewBox="0 0 24 19" fill="none">
                                <path d="M23.5229 10.782C23.7671 10.5284 23.9043 10.1846 23.9043 9.82612C23.9043 9.46763 23.7671 9.12382 23.5229 8.87029L16.154 1.22225C16.0339 1.09312 15.8901 0.990126 15.7312 0.919271C15.5723 0.848416 15.4013 0.81112 15.2284 0.80956C15.0554 0.808 14.8839 0.842208 14.7238 0.910185C14.5637 0.978163 14.4183 1.07855 14.296 1.20549C14.1737 1.33243 14.0769 1.48338 14.0114 1.64953C13.9459 1.81568 13.913 1.99371 13.9145 2.17322C13.916 2.35273 13.9519 2.53013 14.0202 2.69508C14.0885 2.86002 14.1877 3.0092 14.3121 3.13392L19.4574 8.47416H2.20691C1.86144 8.47416 1.53011 8.6166 1.28582 8.87014C1.04154 9.12368 0.904297 9.46756 0.904297 9.82612C0.904297 10.1847 1.04154 10.5286 1.28582 10.7821C1.53011 11.0356 1.86144 11.1781 2.20691 11.1781L19.4574 11.1781L14.3121 16.5183C14.0748 16.7733 13.9435 17.1148 13.9465 17.4693C13.9495 17.8238 14.0865 18.1629 14.328 18.4135C14.5695 18.6642 14.8962 18.8064 15.2378 18.8095C15.5793 18.8125 15.9083 18.6763 16.154 18.43L23.5229 10.782Z" fill="#F47E46"/>
                            </svg>
                        </h5>
                    </div>
                    <div className="goods__content">
                        {isLoading ? <LoadingCard/> : ((isError || items.length === 0) ? (
                            <EmptyContent 
                                title='Пока что все распродано'
                                text='Но в ближайшее время ожидаются крупные поставки!'
                            /> 
                        ) : items.map((item) => (
                                <SneakerCard
                                    key={item.id}
                                    {...item}
                                />
                            ) 
                        ))}
                    </div>
                </div>
                <div className={classNames("gender", isPWA() && "gender--mobile")}>
                    <div className="gender__male" onClick={() => onChooseGender(true)} title="Мужская спортивная обувь">
                        <img src={maleImage} alt="male"/>
                        <h2 className="gender__male-title">Для него</h2>
                    </div>
                    <div className="gender__female" onClick={() => onChooseGender(false)} title="Женская спортивная обувь">
                        <img src={femaleImage} alt="female"/>
                        <h2 className="gender__female-title">Для неё</h2>
                    </div>
                </div>
            </div>
            <Footer />

            <SignPopup />
        </>
    );
}
