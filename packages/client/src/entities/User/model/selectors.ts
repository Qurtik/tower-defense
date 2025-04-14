import { type RootState } from '@/app/store/store'

export const selectUser = (state: RootState) => state.user.user
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated
export const selectAuthLoading = (state: RootState) => state.user.isLoading
export const selectAuthError = (state: RootState) => state.user.error
export const selectUserAvatarPath = (state: RootState) =>
  state.user.user?.avatar
export const selectPathAvatar = (state: RootState) => state.user.pathAvatar
