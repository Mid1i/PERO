export const registrationInputs = [
    {
        id: 'fullName',
        name: 'fullName',
        placeholder: 'Введите свои ФИО',
        title: 'ФИО полностью',
        type: 'text',
    },
    {
        id: 'email',
        name: 'email',
        placeholder: 'Введите свой email',
        title: 'Почтовый адрес в формате example@mail.ru',
        type: 'email',
    },
    {
        id: 'password',
        name: 'password',
        placeholder: 'Придумайте пароль',
        title: 'От 8 до 25 символов. Состоит из латиницы в верхнем и нижнем регистрах и цифр',
        type: 'password',
    },
    {
        id: 'passwordCheck',
        name: 'passwordCheck',
        placeholder: 'Повторите пароль',
        title: 'Пароли должны совпадать',
        type: 'password',
    },
]

export const loginInputs = [
    {
        id: 'email',
        placeholder: 'Email',
        type: 'email'
    },
    {
        id: 'password',
        placeholder: 'Пароль',
        type: 'password'
    },
]
