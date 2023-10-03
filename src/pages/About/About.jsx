import {useEffect} from "react";

import {
    Footer, 
    LeftNavPanel,
    HeaderTop, 
    SearchBar, 
    SignPopup
} from "@components";

import "./About.style.scss";

import image1 from "@assets/images/content-images/about-page/about-image-1.jpg";
import image2 from "@assets/images/content-images/about-page/about-image-2.jpg";
import image3 from "@assets/images/content-images/about-page/about-image-3.jpg";


export default function About() {
    useEffect(() => {
        document.title = 'О нас - PERO';
    }, [])


    return (
        <>
            <HeaderTop />
            <SearchBar />
            <div className="content content--about">
                <div className="about">
                    <LeftNavPanel />
                    <div className="about__right">
                        <h4 className="about__right-title">О нас</h4>
                        <p className="about__right-text">PERO — это сеть мультибрендовых магазинов обуви и аксессуаров от мировых спортивных и лайфстайл брендов: Adidas, Reebok, PUMA, New Balance, Nike, Vans, Converse, Jordan.</p>
                        <p className="about__right-text">Магазины PERO созданы для людей, которые живут в активном ритме, следят за последними мировыми трендами, всегда находят для себя занятие по душе и не представляют жизни без удобной обуви.</p>
                        <p className="about__right-text">У нас можно найти классические модели кроссовок и кед, обувь, вдохновленную ярким образом жизни и разнообразными видами спорта.</p>
                        <div className="about__right-block image-block">
                            <div className="image-block__left">
                                <img className="image-block__left-image" src={image1} alt="sneakers"/>
                                <img className="image-block__left-image" src={image2} alt="sneakers"/>
                            </div>
                            <img className="image-block__right-image" src={image3} alt="sneakers"/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <SignPopup />
        </>
    );
}