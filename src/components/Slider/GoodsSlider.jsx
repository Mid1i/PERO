import Slider from "react-slick";

import { sliderTitles as titles, settings } from "@utils/constants";

import "./GoodsSlider.styles.scss";


//TODO: получение данных с бека
function GoodsSlider() {
    return (
        <Slider {...settings}>
            { titles.map((item, i) => <div className="slider__section" key={ i }>
                <div className={`slider__section-item slider-item slider-item--${i+1}`}>
                    <h6 className="slider-item__subtitle">Новинка</h6>
                    <h2 className="slider-item__title">{ item }</h2>
                    <button className="slider-item__btn btn">Купить</button>
                    <button className="slider-item__sign btn">Pero</button>
                </div>
            </div>) }
        </Slider>
    )
}

export default GoodsSlider;