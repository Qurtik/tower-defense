import { type RootState } from '@/app/store/store'

export const selectUser = (state: RootState) => state.user.user
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated
export const selectAuthLoading = (state: RootState) => state.user.isLoading
export const selectAuthError = (state: RootState) => state.user.error
export const selectUserAvatarPath = (state: RootState) =>
  state.user.user?.avatar
export const selectPathAvatar = (state: RootState) => state.user.user?.avatar
export const selectIsLoggingIn = (state: RootState) => state.user.isLoggingIn
export const selectIsLoggingOut = (state: RootState) => state.user.isLoggingOut
export const selectIsRegistering = (state: RootState) =>
  state.user.isRegistering
