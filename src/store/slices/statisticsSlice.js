import { createSlice } from '@reduxjs/toolkit';

import { LANGUAGES } from '../../constants/settings';
import { set } from 'lodash';

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        streak: 0,
        total: 0,
        completed: 0,
        failed: 0,
        skipped: 0,
    },
    reducers: {
        setTotalResultsCount    : (state, action) => {
            state.total = action.payload;
        },
        setStreak: (state, action) => {
            state.streak = action.payload;
        },
        setCompletedResultsCount: (state, action) => {
            state.completed = action.payload;
        },
        setFailedResultsCount: (state, action) => {
            state.failed = action.payload;
        },
        setSkippedResultsCount: (state, action) => {
            state.skipped = action.payload;
        }
    }
})

export const {setTotalResultsCount, } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;