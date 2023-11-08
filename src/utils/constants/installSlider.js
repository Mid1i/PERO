import back1 from "@assets/images/slider-install-images/backgrounds/1.png";
import back2 from "@assets/images/slider-install-images/backgrounds/2.png"; 
import back3 from "@assets/images/slider-install-images/backgrounds/3.png"; 

import bottomPanel from "@assets/images/slider-install-images/steps/bottom-panel.jpg"; 
import homeButton from "@assets/images/slider-install-images/steps/home-button.jpg"; 
import peroLogoIcon from "@assets/images/slider-install-images/steps/pero-logo-icon.png"; 
import safariIcon from "@assets/images/slider-install-images/steps/safari-icon.png"; 


export const installSliderData = [
    {
        back: back1,
        id: 1,
        text: 'Далее 4 простых шага',
    },
    {
        alt: 'safari',
        back: back2,
        id: 2,
        image: safariIcon,
        step: '1. Перейдите в Safari и откройте сайт pero-nn.ru',
    },
    {
        alt: 'panel',
        back: back2,
        id: 3,
        image: bottomPanel,
        step: '2. Нажмите на кнопку «Отправить». Она находится в нижней части экрана',
    },
    {
        alt: 'home',
        back: back2,
        id: 4,
        image: homeButton,
        step: '3. Выберите пункт На экран «Домой» ',
    },
    {
        alt: 'add',
        back: back3,
        id: 5,
        image: peroLogoIcon,
        step: '4. Нажмите «Добавить» и ищите приложение на рабочем столе',
    },
];


export const installSliderSettings = {
    arrows: true,
    dots: true,
    easing: 'linear',
    infinite: false,
    slidesToShow: 1,
    speed: 600,
    swipe: true,
    className: "install-popup__slider",
    waitForAnimation: true,
}