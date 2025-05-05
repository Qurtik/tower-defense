import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { IUserData } from '../types'
import {
  changeAvatar,
  changePassword,
  getUserInfo,
  login,
  logout,
  register,
  updateProfile,
  getAppId,
  loginViaYandex,
} from './thunks'

interface IUserState {
  user: IUserData | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  isLoggingIn: boolean
  isLoggingOut: boolean
  isRegistering: boolean
}

const initialState: IUserState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isRegistering: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    authHandlers(builder), changeDataUserHandlers(builder)
  },
  selectors: {
    selectIsAuthenticated: state => state.isAuthenticated,
    selectIsLoggingIn: state => state.isLoggingIn,
    selectIsLoggingOut: state => state.isLoggingOut,
    selectIsRegistering: state => state.isRegistering,
    selectUser: state => state.user,
    selectAuthLoading: state => state.isLoading,
    selectAuthError: state => state.error,
    selectUserAvatarPath: state => state.user?.avatar,
  },
})

function authHandlers(builder: ActionReducerMapBuilder<IUserState>) {
  builder
    .addCase(getUserInfo.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
    })
    .addCase(getUserInfo.rejected, (state, action) => {
      state.isLoading = false
      if (action.payload) {
        state.error = action.payload
      }
      state.isAuthenticated = false
      state.user = initialState.user
    })

  builder
    .addCase(login.pending, state => {
      state.isLoggingIn = true
    })
    .addCase(login.fulfilled, state => {
      state.isLoggingIn = false
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoggingIn = false
      if (action.payload) {
        state.error = action.payload
      }
    })

  builder
    .addCase(logout.pending, state => {
      state.isLoggingOut = true
    })
    .addCase(logout.fulfilled, state => {
      state.user = initialState.user
      state.isLoggingOut = false
      state.isAuthenticated = false
    })
    .addCase(logout.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload
      }
    })

  builder
    .addCase(register.pending, state => {
      state.isRegistering = true
    })
    .addCase(register.fulfilled, state => {
      state.isRegistering = false
    })
    .addCase(register.rejected, (state, action) => {
      state.isRegistering = false
      if (action.payload) {
        state.error = action.payload
      }
    })

  builder
    .addCase(getAppId.pending, state => {
      state.isLoggingIn = true
      sessionStorage.setItem('oauth', 'true')
    })
    .addCase(getAppId.rejected, (state, action) => {
      state.isLoggingIn = false
      sessionStorage.removeItem('oauth')
      if (action.payload) {
        state.error = action.payload
      }
    })

  builder
    .addCase(loginViaYandex.pending, state => {
      state.isLoggingIn = true
    })
    .addCase(loginViaYandex.fulfilled, state => {
      state.isLoggingIn = false
      sessionStorage.removeItem('oauth')
    })
    .addCase(loginViaYandex.rejected, (state, action) => {
      state.isLoggingIn = false
      sessionStorage.removeItem('oauth')
      if (action.payload) {
        state.error = action.payload
      }
    })
}

function changeDataUserHandlers(builder: ActionReducerMapBuilder<IUserState>) {
  builder.addCase(changePassword.rejected, (state, action) => {
    if (action.payload) {
      state.error = action.payload
    }
  })

  builder
    .addCase(changeAvatar.pending, state => {
      state.error = null
    })
    .addCase(changeAvatar.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(changeAvatar.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload
      }
    })

  builder
    .addCase(updateProfile.pending, state => {
      state.error = null
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(updateProfile.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload
      }
    })
}

export default userSlice.reducer

export const {
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  selectIsLoggingIn,
  selectIsLoggingOut,
  selectIsRegistering,
  selectUser,
  selectUserAvatarPath,
} = userSlice.selectors
