import { createSlice } from '@reduxjs/toolkit';

const habitsSlice = createSlice({
    name: 'habits',
    initialState: {
        habit: null,
        habits: []
    },
    reducers: {
        getHabit: (state, action) => {
            state.habit = action.payload;
        },
        getHabits: (state, action) => {
            state.habits = action.payload ? action.payload.habits : [];
        }
    }
})

export const {getHabit, getHabits} = habitsSlice.actions;
export const habitsReducer = habitsSlice.reducer;