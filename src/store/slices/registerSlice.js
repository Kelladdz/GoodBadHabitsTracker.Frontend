import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        userName: '',
        userNameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        confirmPassword: '',
        confirmPasswordError: ''
    },
    reducers: {
        changeUserName: (state, action) => {
            state.userName = action.payload;
        },
        toggleUserNameError: (state, action) => {
            state.userNameError = action.payload;
        },
        changeEmail: (state, action) => {
            state.email = action.payload;
        },
        toggleEmailError: (state, action) => {
            state.emailError = action.payload;
        },
        changePassword: (state, action) => {
            state.password = action.payload;
        },
        togglePasswordError: (state, action) => {
            state.passwordError = action.payload;
        },
        changeConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
        toggleConfirmPasswordError: (state, action) => {
            state.confirmPasswordError = action.payload;
        }
    }
})

export const {changeUserName, toggleUserNameError, 
    changeEmail, toggleEmailError,
    changePassword, togglePasswordError,
    changeConfirmPassword, toggleConfirmPasswordError} = registerSlice.actions;
export const registerReducer = registerSlice.reducer;