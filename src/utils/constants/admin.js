export const adminTableHeader = [
    {
        'id': 'id',
        'title': 'ID товара'
    },
    {
        'id': 'creationDateTime',
        'title': 'Дата создания',
        'elements': ['Сначала Новые', 'Сначала Старые'],
        'values': ['creationDateTime,desc', 'creationDateTime,asc']
    },
    {
        'id': 'updatedDateTime',
        'title': 'Дата обновления',
        'elements': ['Сначала Новые', 'Сначала Старые'],
        'values': ['updatedDateTime,desc', 'updatedDateTime,asc']
    },
    {
        'id': 'name',
        'title': 'Название товара',
        'elements': ['По Алфавиту А-Я', 'По Алфавиту Я-А'],
        'values': ['name,asc', 'name,desc']
    },
    {
        'id': 'brand',
        'title': 'Бренд',
        'elements': ['По Алфавиту A-Z', 'По Алфавиту Z-A'],
        'values': ['brand,asc', 'brand,desc']
    },
    {
        'id': 'isMale',
        'title': 'Модель',
        'elements': ['Сначала Мужские', 'Сначала Женские'],
        'values': ['isMale,desc', 'isMale,asc']
    },
    {
        'id': 'price',
        'title': 'Цена, ₽',
        'elements': ['По Возрастанию Цены', 'По Убыванию Цены'],
        'values': ['price,asc', 'price,desc']
    },
    {
        'id': 'isActive',
        'title': 'Активный',
        'elements': ['Сначала Активные', 'Сначала Неактивные'],
        'values': ['isActive,desc', 'isActive,asc']
    },
    {
        'id': 'isPopular',
        'title': 'Популярный',
        'elements': ['Сначала Популярные', 'Сначала Непопулярные'],
        'values': ['isPopular,desc', 'isPopular,asc']
    },
];


export const adminInputs = [
    {
        id: 'name',
        placeholder: 'Введите название товара',
        type: 'text'
    },
    {
        id: 'price',
        placeholder: 'Введите цену товара',
        type: 'number'
    },
    {
        id: 'color',
        placeholder: 'Введите цвет товара',
        type: 'text'
    },
]
