export const getBaseURL = () => {
  const isServer = typeof window === 'undefined'

  const baseURL = isServer
    ? process.env.API_PRACTICUM_URL
    : import.meta.env.VITE_API_PRACTICUM_URL

  return baseURL
}
