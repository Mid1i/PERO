import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import axios from "axios";

// import {installPWA} from "../../serviceWorker";
import {useRequest, useScroll} from "@hooks";
import {appContext} from "@services/Context";
import { 
    Brands, 
    EmptyContent, 
    Footer, 
    GoodsSlider, 
    HeaderTop, 
    LoadingCard, 
    SearchBar, 
    SneakerCard 
} from "@components";

import "./Home.style.scss";

import maleImage from "@assets/images/gender-images/1.jpg";
import femaleImage from "@assets/images/gender-images/2.jpg";


export default function Home() {
    const {setIsMale} = useContext(appContext);

    const navigate = useNavigate();

    useScroll();


    const fetchItems = () => axios.get('https://java.pero-nn.ru/api/public/get_sneakers?page=0&size=15&isPopular=true');

    const onChooseGender = (gender) => {
        setIsMale(gender);
        navigate('/catalog/');
    }

    const [items, error, loading] = useRequest(fetchItems, 'items');


    return (
        <>
            <HeaderTop />
            <SearchBar />
            <Brands />
            
            <div className="content content--home">
                <GoodsSlider />
                <div className="goods goods--no-margin">
                    {/*<button className="add-button" onClick={() => installPWA()}>click</button>*/}
                    <div className="goods__title">
                        <h4 className="goods__title-left">Наиболее популярные</h4>
                        <h5 className="goods__title-right" onClick={() => navigate('/catalog/')}>Больше кроссовок</h5>
                    </div>
                    <div className="goods__content">
                        {loading ? <LoadingCard className='margins'/> : ((!items || error || items.length === 0) ? (
                            <EmptyContent 
                                title='Пока что все распродано'
                                text='Но в ближайшее время ожидаются крупные поставки!'
                            /> 
                        ) : items.map((item) => (
                                <SneakerCard 
                                    className='margins'
                                    key={item.id}
                                    {...item}
                                />
                            ) 
                        ))}
                    </div>
                </div>
                <div className="gender">
                    <div className="gender__male" onClick={() => onChooseGender(true)}>
                        <img src={maleImage} alt="male"/>
                        <h2 className="gender__male-title">Мужчинам</h2>
                    </div>
                    <div className="gender__female" onClick={() => onChooseGender(false)}>
                        <img src={femaleImage} alt="female"/>
                        <h2 className="gender__female-title">Женщинам</h2>
                    </div>
                </div>
            </div>
            
            <Footer />
        </>
    );
}
