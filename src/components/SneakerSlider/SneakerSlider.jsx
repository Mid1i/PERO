import {useParams} from "react-router-dom";
import classNames from "classnames";
import Slider from "react-slick";

import {LoadingCard, SneakerCard} from "@components";
import {isPWA} from "@utils/helpers";
import {useRequest} from "@hooks";

import "./SneakerSlider.style.scss";


export default function SneakerSlider({id = -1, title, male, func}) {
    const params = useParams();

    const {data: items, isError: isErrorItems, isLoading: isLoadingItems} = useRequest(func, ['items', params.id, male])
    const settings = {
        arrows: false,
        centerMode: true,
        className: "similar-goods__slider",
        dots: false,
        easing: 'linear',
        infinite: true,
        initialSlide: 1,
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
        !isErrorItems && (
            <div className={classNames("content__similar-goods similar-goods", isPWA() && "mobile")}>
                <h4 className="similar-goods__title">{(!isLoadingItems && items?.length !== 0) && title}</h4>
                <Slider {...settings}>
                    {isLoadingItems ? <LoadingCard /> : (
                        items.length !== 0 && (
                            items.filter(item => item.id !== id).map((item) => <SneakerCard {...item} key={item.id}/>
                        ))
                    )}
                </Slider>
            </div>
        )
    );
}