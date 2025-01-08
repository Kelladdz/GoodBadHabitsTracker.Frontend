import { createSlice } from '@reduxjs/toolkit';

import { LANGUAGES } from '../../constants/settings';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        name: "User",
        isSundayFirstDayOfWeek: true,
        language: LANGUAGES.english,
    },
    reducers: {
        changeUserNameIsSettings: (state, action) => {
            state.name = action.payload;
        },
        changeFirstDayOfWeek: (state, action) => {
            state.isSundayFirstDayOfWeek = action.payload;
        },
        changeLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
})

export const {changeFirstDayOfWeek, changeLanguage, changeUserNameIsSettings} = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;