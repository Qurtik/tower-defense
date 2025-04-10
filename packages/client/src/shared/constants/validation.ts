export const VALIDATION_RULES = {
  first_name: [
    { required: true, message: 'Поле обязательно' },
    {
      pattern: /^[A-ZА-ЯЁ][a-zа-яё]+(?:-[A-ZА-ЯЁ][a-zа-яё]+)?$/,
      message:
        'Имя латиница и кириллица, должно начинаться с заглавной буквы, только буквы и дефис',
    },
  ],
  second_name: [
    { required: true, message: 'Поле обязательно' },
    {
      pattern: /^[A-ZА-ЯЁ][a-zа-яё]+(?:-[A-ZА-ЯЁ][a-zа-яё]+)?$/,
      message:
        'Имя латиница и кириллица, должно начинаться с заглавной буквы, только буквы и дефис',
    },
  ],
  login: [
    { required: true, message: 'Поле обязательно' },
    {
      pattern: /^[a-zA-Z0-9_-]{3,20}$/,
      message: 'Логин 3-20 символов, латиница, цифры и -_-',
    },
  ],
  email: [
    { required: true, message: 'Поле обязательно' },
    {
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,}$/,
      message: 'Некорректный email',
    },
  ],
  password: [
    { required: true, message: 'Поле обязательно' },
    {
      pattern: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
      message: 'Пароль 8-40 символов, хотя бы одна заглавная буква и цифра',
    },
  ],
  phone: [
    { required: true, message: 'Поле обязательно' },
    {
      pattern: /^(\+?\d{10,15})$/,
      message:
        'Номер телефона должен содержать от 10 до 15 цифр и может начинаться с плюса',
    },
  ],
}
