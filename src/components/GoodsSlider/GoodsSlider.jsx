import Slider from "react-slick";

import {goodsSliderData as sliderData, goodsSliderSettings as settings} from "@utils/constants";

import "./GoodsSlider.style.scss";


export default function GoodsSlider() {
    return (
        <Slider {...settings}>
            {sliderData.map(({id, title, image}) => (
                    <div className="slider__section" key={id}>
                        <div className="slider__section-item slider-item" style={{backgroundImage: `url(${image})`}}>
                            <h6 className="slider-item__subtitle">Новинка</h6>
                            <h2 className="slider-item__title">{title}</h2>
                            <button className="slider-item__btn btn">Купить</button>
                            <button className="slider-item__sign btn">Pero</button>
                        </div>
                    </div>
                ) 
            )}
        </Slider>
    );
}
