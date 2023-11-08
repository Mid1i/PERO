import {useNavigate} from "react-router-dom";
import Slider from "react-slick";

import {imageImport, toFormatBrand, toFormatBrandForRequest} from "@utils/helpers";
import {brands} from "@utils/constants";

import "./Brands.style.scss";


export default function Brands() {
    const images = imageImport();
    const navigate = useNavigate();
    const settings = {
        arrows: true,
        centerMode: true,
        className: "brands-slider",
        dots: false,
        easing: 'linear',
        infinite: true,
        variableWidth: true,
        swipeToSlide: true,
        slidesToShow: 4,
        speed: 600,
        swipe: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: "unslick"
            }
        ]
    }
 

    return (
        <Slider {...settings}>
            {brands.map(({id, brand}) => (
                <div className="brands-slider__item" key={id} title={toFormatBrand(brand).toUpperCase()}>
                    <img 
                        alt={brand}
                        className="brands-slider__item-image"
                        onClick={() => navigate(`/catalog/?brands=${toFormatBrandForRequest(brand)}`)}
                        src={images.filter(obj => obj.includes(brand))}
                    />
                </div>
            ))}
        </Slider>
    );
}
