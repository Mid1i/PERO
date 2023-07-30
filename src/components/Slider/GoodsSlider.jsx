import Slider from "react-slick";

import "./GoodsSlider.styles.scss";

function GoodsSlider() {
    const itemsTitles = ["Adidas - EQT Bask ADV 'Grey Two'", "Air Jordan - 1 Retro High Vachetta", "Air Jordan - 1 Retro High OG"];

    const settings = {
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000,
        dots: true,
        easing: 'linear',
        fade: true,
        slidesToShow: 1,
        speed: 600,
        swipe: false,
        className: "slider",
        waitForAnimation: true
    }

    return (
        <Slider {...settings}>
            { itemsTitles.map((item, i) => <div className="slider__section" key={ i }>
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