import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooksRedux/hooksRedux'
import { selectAuthLoading, selectIsAuthenticated } from '@/entities/User'
import { checkAuth } from '@/entities/User/model/thunks'

export const useAuthCheck = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectAuthLoading)

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return {
    isAuthenticated,
    isLoading,
  }
}
