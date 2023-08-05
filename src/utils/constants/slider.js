export const sliderTitles = ["Adidas - EQT Bask ADV 'Grey Two'", "Air Jordan - 1 Retro High Vachetta", "Air Jordan - 1 Retro High OG"];

export const settings = {
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

export const similarItemsSliderSettings = {
    arrows: true,
    dots: false,
    easing: 'linear',
    slidesToShow: 4,
    speed: 600,
    swipe: true,
    infinite: false,
    className: "extra-goods__slider",
    waitForAnimation: true,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 850,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 620,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 470,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 320,
            settings: {
                slidesToShow: 1
            }
        }
    ]
}