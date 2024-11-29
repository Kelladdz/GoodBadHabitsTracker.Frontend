import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    idToken: null,
    userData: null,
    expiresIn: '',
    scope: '',
    provider: '',
    signInError: null,
    signUpError: []
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload ? action.payload : null
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload ? action.payload : null
    },
    setUserData: (state, action) => {
      state.userData = action.payload ? action.payload : null
    },
    signUpSuccess: (state) => {
      state.signUpError = [];
    },
    signUpFail: (state, action) => {
      state.signUpError = action.payload ? action.payload : []
    },
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.userData = action.payload.userData ? action.payload.userData : null
      state.signInError = null
    },
    loginFail: (state, action) => {
      state.signInError = action.payload ? action.payload : null
    },
    getExternalTokens: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken ? action.payload.refreshToken : null
      state.idToken = action.payload.idToken
      state.userData = action.payload.userData ? action.payload.userData : null
      state.expiresIn = action.payload.expiresIn
      state.scope = action.payload.scope
      state.provider = action.payload.provider
      state.signInError = null
      console.log('getExternalTokens', state)
    },
    logout: (state) => {
        state.userData = null,
        state.refreshToken = null,
        state.accessToken = null,
        state.signInError = null,
        state.signUpError = []
    },
    setCredentials: (state, action ) => {
      state.userInfo = action.payload
    },
    refreshTokenSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    refreshTokenFail: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.userData = null
      state.signInError = null,
      state.signUpError = []
    },
    setInitialAuthState: (state) => {
      state.accessToken = null,
      state.refreshToken = null,
      state.userData = null,
      state.expiresIn = '',
      state.scope = '',
      state.provider = '',
      state.signInError = null,
      state.signUpError = []
    }
  }
})

export const { setAccessToken, setRefreshToken, setUserData, loginSuccess, loginFail, signUpSuccess, signUpFail, logout, setCredentials, login, getExternalTokens, refreshTokenSuccess, refreshTokenFail, setInitialAuthState } = authSlice.actions

export const authReducer = authSlice.reducer
