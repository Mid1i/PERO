import {brands} from "./brands";


export const footerTitles = [
    {
        id: 1,
        title: 'О магазине', 
    },
    {
        id: 2,
        title: 'Бренды', 
    },
    {
        id: 3,
        title: 'Помощь'
    },
];

export const footerElements = [
    {
        id: 1,
        elements: ['контакты', 'магазины', 'о нас'],
        links: ['/contacts', '/shops', '/about'],
    },
    {
        id: 2,
        elements: [...brands.map(({brand}) => brand)],
    },
    {
        id: 3,
        elements: ['доставка и оплата', 'обмен и возврат', 'уход за обувью'],
        links: ['/delivery-and-payment', '/exchange-and-return', '/care-of-shoes'],
    },
];