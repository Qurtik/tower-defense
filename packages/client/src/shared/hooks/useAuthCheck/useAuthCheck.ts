import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooksRedux/hooksRedux'
import { selectAuthLoading, selectIsAuthenticated } from '@/entities/User'
import { getUserInfo } from '@/entities/User/model/thunks'

export const useAuthCheck = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectAuthLoading)

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      dispatch(getUserInfo())
    }
  }, [dispatch])

  return {
    isAuthenticated,
    isLoading,
  }
}
