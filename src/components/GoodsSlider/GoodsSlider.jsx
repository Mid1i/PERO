import Slider from "react-slick";

import "./GoodsSlider.style.scss";

import image1 from "@assets/images/slider-images/1.jpg";
import image2 from "@assets/images/slider-images/2.jpg";
import image3 from "@assets/images/slider-images/3.jpg";


export default function GoodsSlider() {
    const data = [
        {
            title: 'New level in Style and Comfort',
            image: image1,
        },
        {
            title: 'Move more, Move better', 
            image: image2,
        },
        {
            title: "Results don't lie",
            image: image3,
        }
    ];
    
    const settings = {
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        className: "banner",
        dots: true,
        easing: 'linear',
        fade: true,
        slidesToShow: 1,
        speed: 600,
        swipe: true,
        swipeToSlide: true,
        waitForAnimation: true
    };


    return (
        <Slider {...settings}>
            {data.map(({title, image}, index) => (
                <div key={index}>
                    <div className="banner__item" style={{backgroundImage: `url('${image}')`}}>
                        <h2 className="banner__item-title">{title}</h2>
                    </div>
                </div>
            ))}
        </Slider>
    );
}
