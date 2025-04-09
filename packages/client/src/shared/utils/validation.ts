export const validateName = (value: string) => {
  if (!value) {
    return Promise.reject(new Error('Поле обязательно'))
  }
  const regex = /^[A-ZА-ЯЁ][a-zA-Zа-яё]*-?[A-ZА-ЯЁ]?[a-zA-Zа-яё]*$/
  if (!regex.test(value)) {
    return Promise.reject(
      new Error(
        'Имя латиница и кириллица, должно начинаться с заглавной буквы, только буквы и дефис'
      )
    )
  }
  return Promise.resolve()
}

export const validateLogin = (value: string) => {
  if (!value) {
    return Promise.reject(new Error('Поле обязательно'))
  }
  const regex = /^[a-zA-Z0-9_-]{3,20}$/
  if (!regex.test(value)) {
    return Promise.reject(
      new Error('Логин 3-20 символов, латиница, цифры и -_-')
    )
  }
  return Promise.resolve()
}

export const validateEmail = (value: string) => {
  if (!value) {
    return Promise.reject(new Error('Поле обязательно'))
  }
  const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,}$/
  if (!regex.test(value)) {
    return Promise.reject(new Error('Некорректный email'))
  }
  return Promise.resolve()
}

export const validatePassword = (value: string) => {
  if (!value) {
    return Promise.reject(new Error('Поле обязательно'))
  }
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/
  if (!regex.test(value)) {
    return Promise.reject(
      new Error('Пароль 8-40 символов, хотя бы одна заглавная буква и цифра')
    )
  }
  return Promise.resolve()
}

export const validatePhone = (value: string) => {
  if (!value) {
    return Promise.reject(new Error('Поле обязательно'))
  }
  const regex = /^(\+?\d{10,15})$/
  if (!regex.test(value)) {
    return Promise.reject(
      new Error(
        'Номер телефона должен содержать от 10 до 15 цифр и может начинаться с плюса'
      )
    )
  }
  return Promise.resolve()
}
