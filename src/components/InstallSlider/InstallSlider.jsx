import {isMobile, isSafari} from "react-device-detect";
import classNames from "classnames";
import {useContext} from "react";
import Slider from "react-slick";

import {installSliderData as slider, installSliderSettings} from "@utils/constants";
import {installPWA} from "@services/serviceWorker";
import useNoScroll from "@hooks/useNoScroll";
import {isPWA} from "@utils/helpers";

import {appContext} from "@services/Context";

import "./InstallSlider.style.scss";

import {whiteCross} from "@assets/images";
import peroLogo from "@assets/images/slider-install-images/steps/pero-logo-icon-big.png";


export default function InstallSlider() {
    const {installPopup, setInstallPopup} = useContext(appContext);

    useNoScroll(installPopup);
    

    return (
        (!isPWA() && isMobile) && (
            <div className={classNames("install-popup", installPopup && "active")}>
                <div className="install-popup__wrapper" onClick={setInstallPopup}>
                    <img className="install-popup__wrapper-icon" src={whiteCross} alt="close"/>
                </div>
                <h2 className="install-popup__title">PERO Mobile</h2>
                <p className="install-popup__subtitle">{`Наше приложение пока недоступно в ${isSafari ? 'Apple Store' : 'Google Play'}, поэтому Вы можете добавить ярлык PERO на экран домой`}</p>
                {isSafari ? (
                    <Slider {...installSliderSettings}>
                        {slider.map(slide => (
                            <div className="install-popup__slider-item install-item" key={slide.id}>
                                <img className="install-item__image" src={slide.back} alt="iPhone"/>
                                {slide.id > 1 && (
                                    <div className="install-item__step">
                                        <img className={classNames(
                                            "install-item__step-image", 
                                            (slide.id === 2 || slide.id === 5) && "install-item__step-image--square"    
                                        )}src={slide.image} alt={slide.alt}/>
                                        <p className="install-item__step-text">{slide.step}</p>
                                    </div>
                                )}
                                {slide.id === 1 && (
                                    <p className="install-item__text">{slide.text}</p>    
                                )}
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <>
                        <img className="install-popup__image" src={peroLogo} alt="logo"/>
                        <button className="install-popup__btn btn" onClick={() => installPWA()}>Скачать</button>
                    </>
                )}
            </div>
        )
    );
}