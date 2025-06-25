import { AxiosError } from 'axios'

function handleApiError(error: unknown, customMessage = 'УПС'): never {
  if (error instanceof AxiosError) {
    if (error.response) {
      throw new Error(
        `${customMessage} (Ошибка сервера: ${error.response.status} - ${error.response.data.reason})`
      )
    }
    if (error.request) {
      throw new Error(
        `${customMessage} (Сервер не отвечает, проверьте соединение)`
      )
    }
    throw new Error(`${customMessage} (Ошибка запроса: ${error.message})`)
  } else if (error instanceof Error) {
    throw new Error(`${customMessage} (Детали ошибки: ${error.message})`)
  } else {
    throw new Error(`${customMessage} (Неизвестная ошибка)`)
  }
}

export default handleApiError
