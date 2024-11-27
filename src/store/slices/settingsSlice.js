import { createSlice } from '@reduxjs/toolkit';

import { LANGUAGES } from '../../constants/settings';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        isSundayFirstDayOfWeek: true,
        language: LANGUAGES.english,
    },
    reducers: {
        changeFirstDayOfWeek: (state, action) => {
            state.isSundayFirstDayOfWeek = action.payload;
        },
        changeLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
})

export const {changeFirstDayOfWeek, changeLanguage} = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;