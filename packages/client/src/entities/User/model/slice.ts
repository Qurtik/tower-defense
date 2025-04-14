import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { IUserData } from '../types'
import {
  changeAvatar,
  changePassword,
  getUserInfo,
  login,
  logout,
  updateProfile,
} from './thunks'

interface IUserState {
  user: IUserData | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  pathAvatar: string | null
}

const initialState: IUserState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  pathAvatar: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    authHandlers(builder), changeDataUserHandlers(builder)
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
      state.pathAvatar = action.payload.avatar
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

  builder.addCase(login.rejected, (state, action) => {
    if (action.payload) {
      state.error = action.payload
    }
  })

  builder
    .addCase(logout.fulfilled, state => {
      state.user = initialState.user
      state.isAuthenticated = false
    })
    .addCase(logout.rejected, (state, action) => {
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
    .addCase(changeAvatar.fulfilled, (state, action) => {
      state.pathAvatar = action.payload.avatar
    })
    .addCase(changeAvatar.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload
      }
    })

  builder
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
