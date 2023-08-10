export const filters = [
    {
        "id": "brands",
        "title": "Бренд",
        "elements": ['Nike', 'Adidas', 'Puma', 'New Balance', 'Vans', 'Reebok', 'Jordan', 'Converse'],
        "values": ['NIKE', 'ADIDAS', 'PUMA', 'NEW_BALANCE', 'VANS', 'REEBOK', 'JORDAN', 'CONVERSE'],
    },
    {
        "id": "sizes",
        "title": "Размер",
        "elements": ['35', '35.5', '36', '36.5', '37', '37.5', '38', '39', '40', '41', '42', '42.5', '43', '43.5', '44', '44.5', '45'],
    },
    {
        "id": "colors",
        "title": "Цвет",
    },
];

export const sorting = {
    "id": 'sort',
    "title": 'Сортировка',
    "elements": ['По популярности', 'По возрастанию цены', 'По убыванию цены'],
    "values": ['', 'price,asc', 'price,desc'],
};
