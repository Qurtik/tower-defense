# User API

## Базовый путь

```
/users
```

## Эндпоинты

### PUT `/users/`

Создаёт или обновляет пользователя.

#### Тело запроса

```json
{
  "data": {
    "id": "string",
    "first_name": "string",
    "second_name": "string",
    "display_name": "string",
    "phone": "string",
    "login": "string",
    "avatar": "string",
    "email": "string"
  }
}
```

#### Ответы

- `201 Created`: Пользователь успешно создан.
- `200 OK`: Данные пользователя успешно обновлены.
- `400 Bad Request`: Не указан `id` пользователя.
- `500 Internal Server Error`: Ошибка обработки данных.

#### Пример ответа

```json
{
  "success": true,
  "user": { ... },
  "message": "Пользователь успешно создан"
}
```

### GET `/users/:id`

Получает данные пользователя по `id`.

#### Параметры пути

- `id` — идентификатор пользователя

#### Ответы

- `200 OK`: Успешно, возвращаются данные пользователя.
- `404 Not Found`: Данные пользователя не найдены.
- `500 Internal Server Error`: Ошибка получения данных.

#### Пример ответа

```json
{
  "id": "123",
  "first_name": "Иван",
  "second_name": "Иванов",
  "display_name": "ivanivanov",
  "phone": "+70000000000",
  "login": "ivan_login",
  "avatar": "https://example.com/avatar.png",
  "email": "ivan@example.com"
}
```
