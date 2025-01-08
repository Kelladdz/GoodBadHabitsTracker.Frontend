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
        setTotalResultsCount: (state, action) => {
            state.total = action.payload;
        },
        setCompletedResultsCount: (state, action) => {
            state.completed = action.payload;
        },
        setFailedResultsCount: (state, action) => {
            state.failed = action.payload;
        },
        setSkippedResultsCount: (state, action) => {
            state.skipped = action.payload;
        },
        setStreak: (state, action) => {
            state.streak = action.payload;
        },
        addCompletedResult: (state) => {
            state.total = state.total + 1
            state.completed = state.completed + 1
        },
        addFailedResult: (state) => {
            state.total = state.total + 1
            state.failed = state.failed + 1
        },
        addSkippedResult: (state) => {
            state.total = state.total + 1
            state.skipped = state.skipped + 1
        },
        addStreak: (state) => {
            state.streak = state.streak + 1
        }
    }
})

export const {setTotalResultsCount, setStreak, setCompletedResultsCount, setFailedResultsCount, setSkippedResultsCount, addResult,
    addCompletedResult, addFailedResult, addSkippedResult, addStreak} = statisticsSlice.actions;
export const statisticsReducer = statisticsSlice.reducer;