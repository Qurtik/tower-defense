import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserData } from '../types'

interface IUserState {
  user: IUserData | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: IUserState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserData>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    clearUser: state => {
      state.user = initialState.user
      state.isAuthenticated = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setUser, clearUser, setLoading, setError } = userSlice.actions
export default userSlice.reducer
