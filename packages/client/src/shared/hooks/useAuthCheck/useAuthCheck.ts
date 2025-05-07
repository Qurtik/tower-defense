import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooksRedux/hooksRedux'
import { selectAuthLoading, selectIsAuthenticated } from '@/entities/User'
import { getUserInfo } from '@/entities/User/model/thunks'

export const useAuthCheck = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectAuthLoading)
  const [isClient, setIsClient] = useState(false)
  const oauth = isClient && sessionStorage.getItem('oauth')

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !oauth) {
      dispatch(getUserInfo())
    }
  }, [dispatch])

  return {
    isAuthenticated,
    isLoading,
  }
}
