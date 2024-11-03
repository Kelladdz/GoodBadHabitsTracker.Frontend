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
            console.log('Habits:', action.payload);
            state.habits.push(action.payload);
        }
    }
})

export const {getHabit, getHabits} = habitsSlice.actions;
export const habitsReducer = habitsSlice.reducer;