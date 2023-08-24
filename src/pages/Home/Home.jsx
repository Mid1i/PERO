import {useNavigate} from "react-router-dom";
import {useContext} from "react";

// import {installPWA} from "../../serviceWorker";
import {useRequest, useScroll} from "@hooks";
import {appContext} from "@services/Context";
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


export default function Home() {
    const {setIsMale} = useContext(appContext);
    
    const {data: items, isError, isLoading} = useRequest(fetchProducts);

    const navigate = useNavigate();

    useScroll();


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
                            <svg width="26" height="21" fill="none">
                                <path stroke="#F47E46" d="M24 10.5H2m22 0L14.5714 19M24 10.5 14.5714 2" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
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
                <div className="gender">
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
