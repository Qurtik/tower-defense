export const formateDate = (str?: string): string => {
  if (!str) return ''
  const date = new Date(str)

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  }

  const formattedDate = date.toLocaleString('ru-RU', options)
  return formattedDate
}
