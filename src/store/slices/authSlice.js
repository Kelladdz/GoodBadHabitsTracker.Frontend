import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'
import ForgetPassword from '../../components/sign-in/ForgetPassword'


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
    signUpError: [],
    forgetPasswordError: '',
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
      console.log('signUpFail', action.payload)
      state.signUpError = action.payload ? action.payload : []
    },
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.userData = action.payload.userData ? action.payload.userData : null
      state.signInError = null
    },
    loginFail: (state, action) => {
      console.log('loginFail', action.payload.response.data.errors)
      state.signInError = action.payload ? action.payload.response.data.errors : null
    },
    sendResetPasswordLinkFailed: (state, action) => {
      console.log('sendResetPasswordLinkFailed', action.payload)
      state.forgetPasswordError = action.payload ? action.payload : null
    },
    sendResetPasswordLinkSuccess: (state) => {
      state.forgetPasswordError = ''
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
      console.log('Logout...')
      state.accessToken = null,
      state.refreshToken = null,
      state.userData = null,
      state.expiresIn = '',
      state.scope = '',
      state.provider = '',
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
    }
  }
})

export const { setAccessToken, setRefreshToken, setUserData, loginSuccess, loginFail, signUpSuccess, signUpFail, logout, setCredentials, login, sendResetPasswordLinkSuccess, sendResetPasswordLinkFailed, getExternalTokens, refreshTokenSuccess, refreshTokenFail } = authSlice.actions

export const authReducer = authSlice.reducer
