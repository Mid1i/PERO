import image1 from "@assets/images/slider-images/1.jpg";
import image2 from "@assets/images/slider-images/2.jpg";
import image3 from "@assets/images/slider-images/3.jpg";


export const goodsSliderData = [
    {
        id: 1,
        title: 'New level in Style and Comfort',
        image: image1,
    },
    {
        id: 2,
        title: 'Move more, Move better', 
        image: image2,
    },
    {
        id: 3,
        title: "Results don't lie",
        image: image3,
    }
];

export const goodsSliderSettings = {
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
