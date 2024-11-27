import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: localStorage.getItem('accessToken') ?? '',
    refreshToken: localStorage.getItem('refreshToken') ?? '',
    idToken: localStorage.getItem('idToken') ?? '',
    userFingerprint: '',
    expiresIn: '',
    scope: '',
    provider: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    imageUrl: '',
    
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem('accessToken', action.payload.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.userFingerprint = jwtDecode(action.payload.accessToken).userFingerprint
      state.firstName = jwtDecode(action.payload.accessToken).firstName
      state.lastName = jwtDecode(action.payload.accessToken).lastName
      state.userName = jwtDecode(action.payload.accessToken).name
    },
    getExternalTokens: (state, action) => {
      localStorage.setItem('idToken', action.payload.idToken) 
      localStorage.setItem('accessToken', action.payload.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
      state.idToken = action.payload.idToken
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.expiresIn = action.payload.expiresIn
      state.scope = action.payload.scope
      state.provider = action.payload.provider
    },
    logout: (state) => {
      localStorage.removeItem('accessToken') // delete token from storage
      localStorage.removeItem('refreshToken') // delete refresh token from storage
      state.accessToken = ''
      state.refreshToken = ''
      state.firstName = ''
      state.lastName = ''
      state.userName = ''
      state.userFingerprint = ''
    },
    setCredentials: (state, action ) => {
      state.userInfo = action.payload
    },
  }
})

export const { logout, setCredentials, login, getExternalTokens } = authSlice.actions

export const authReducer = authSlice.reducer
