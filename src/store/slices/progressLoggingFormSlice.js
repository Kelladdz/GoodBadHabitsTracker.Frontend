import { createSlice } from '@reduxjs/toolkit';

const progressLoggingFormSlice = createSlice({
    name: 'progressLoggingForm',
    initialState: { 
        progress: 0,
        status: 3,
        date: new Date().toISOString().substring(0, 10),
    },
    reducers: {
        changeProgress: (state, action) => {
            state.progress = action.payload;
        },
        changeStatus: (state, action) => {
            state.status = action.payload;
        },
        changeDate: (state, action) => {
            state.date = action.payload;
        },
        resetProgressLoggingForm: (state) => {
            state.progress = 0;
            state.status = 3;
            state.date = new Date().toISOString().substring(0, 10);
        },
        fillProgressLoggingForm: (state, action) => {
            state.progress = action.payload.progress;
            state.status = action.payload.status;
            state.date = action.payload.date;
        }
    }
});

export const {
    changeProgress,
    changeStatus,
    changeDate,
    resetProgressLoggingForm,
    fillProgressLoggingForm} = progressLoggingFormSlice.actions;
export const progressLoggingFormReducer = progressLoggingFormSlice.reducer;