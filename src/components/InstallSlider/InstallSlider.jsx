import classNames from "classnames";
import Slider from "react-slick";
import {useEffect} from "react";

import {installSliderData as slider, installSliderSettings} from "@utils/constants";

import "./InstallSlider.style.scss";


export default function InstallSlider() {
    useEffect(() => {
        
    })


    return (
        <div className="install-popup">
            <h2 className="install-popup__title">PERO Mobile</h2>
            <p className="install-popup__subtitle">Наше приложение пока недоступно в Apple Store, поэтому Вы можете добавить ярлык PERO на экран домой</p>
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
        </div>
    );
}