import { useEffect, useState } from 'react'

export const useCheckIsClient = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  })

  return {
    isClient,
  }
}
