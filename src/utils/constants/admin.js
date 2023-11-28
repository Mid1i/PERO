export const adminTableHeader = [
    {
        'id': 'id',
        'title': 'ID товара'
    },
    {
        'id': 'date',
        'title': 'Дата создания',
        'elements': ['Сначала Новые', 'Сначала Старые'],
        'values': ['date,desc', 'date,asc']
    },
    {
        'id': 'name',
        'title': 'Название товара',
        'elements': ['По Алфавиту А-Я', 'По Алфавиту Я-А'],
        'values': ['name,desc', 'name,asc']
    },
    {
        'id': 'brand',
        'title': 'Бренд',
        'elements': ['По Алфавиту A-Z', 'По Алфавиту Z-A'],
        'values': ['brand,desc', 'brand,asc']
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
]
