import { createSlice } from '@reduxjs/toolkit';
import { HABIT_TYPES } from '../../constants/habits-properties';
import { remove } from 'lodash';

const goodHabitCreatorSlice = createSlice({
    name: 'goodHabitCreator',
    initialState: { 
        name: '',
        iconIndex: 0,
        habitType: 0,
        quantity: 60,
        isTimeBased: true,
        frequency: 0,
        repeatMode: 1,
        repeatDaysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        repeatDaysOfMonth: [],
        repeatInterval: null,
        startDate: new Date().toISOString().substring(0, 10),
        groupId: null
    },
    reducers: {
        changeName: (state, action) => {
            state.name = action.payload;
        },
        changeIcon: (state, action) => {
            state.iconIndex = action.payload;
        },
        changeHabitType: (state, action) => {
            state.habitType = action.payload;
            switch (action.payload) {
                case HABIT_TYPES.good:
                    state.quantity = !state.quantity ? state.quantity = 1 : state.quantity;
                    state.isTimeBased = !state.isTimeBased ? state.isTimeBased = true : state.isTimeBased;
                    state.frequency = !state.frequency ? state.frequency = 1 : state.frequency;
                    state.repeatMode = 1;
                    state.repeatDaysOfWeek = [0, 1, 2, 3, 4, 5, 6];
                    state.repeatDaysOfMonth = [];
                    break;
                case HABIT_TYPES.limit:
                    state.quantity = !state.quantity ? state.quantity = 1 : state.quantity;
                    state.isTimeBased = !state.isTimeBased ? state.isTimeBased = true : state.isTimeBased;
                    state.frequency = !state.frequency ? state.frequency = 1 : state.frequency;
                    state.repeatMode = 0;
                    state.repeatDaysOfWeek = null;
                    state.repeatDaysOfMonth = null;
                    state.repeatInterval = null;
                    break;
                case HABIT_TYPES.quit:
                    state.quantity = null;
                    state.isTimeBased = null;
                    state.frequency = null;
                    state.repeatMode = 0;
                    state.repeatDaysOfWeek = null;
                    state.repeatDaysOfMonth = null;
                    state.repeatInterval = null;
                    break;
                default:
                    break;
            }
        },
        changeQuantity: (state, action) => {
            state.quantity = action.payload;
        },
        changeIsTimeBased: (state, action) => {
            console.log('change to ', action.payload)
            state.isTimeBased = action.payload;
        },
        changeFrequency: (state, action) => {
            state.frequency = action.payload;
        },
        changeRepeatMode: (state, action) => {
            state.repeatMode = action.payload;
        },
        addRepeatDayOfWeek: (state, action) => {
            state.repeatDaysOfWeek.push(action.payload);
            state.repeatDaysOfWeek.sort();
        },
        removeRepeatDayOfWeek: (state, action) => {
            remove(state.repeatDaysOfWeek, (day) => day === action.payload);
            state.repeatDaysOfWeek.sort();
        },
        clearRepeatDaysOfWeek: (state) => {
            state.repeatDaysOfWeek = [];
        },
        addRepeatDayOfMonth: (state, action) => {
            state.repeatDaysOfMonth.push(action.payload);
            state.repeatDaysOfMonth.sort();
        },
        removeRepeatDayOfMonth: (state, action) => {
            remove(state.repeatDaysOfMonth, (day) => day === action.payload);
            state.repeatDaysOfMonth.sort();
        },
        clearRepeatDaysOfMonth: (state) => {
            state.repeatDaysOfMonth = [];
        },
        changeRepeatInterval: (state, action) => {
            state.repeatInterval = action.payload;
        },
        changeStartDate: (state, action) => {
            state.startDate = action.payload;
        },
        changeGroup: (state, action) => {
            console.log('action.payload', action.payload);
            state.groupId = action.payload;
        },
        resetForm: (state) => {
            state.name = '';
            state.iconIndex = 0;
            state.habitType = 0;
            state.quantity = 60;
            state.isTimeBased = true;
            state.frequency = 1;
            state.repeatMode = 1;
            state.repeatDaysOfWeek = [0, 1, 2, 3, 4, 5, 6];
            state.repeatDaysOfMonth = [];
            state.repeatInterval = null;
            state.startDate = new Date().toISOString().substring(0, 10);
            state.groupId = null;
        },
        fillForm: (state, action) => {
            state.name = action.payload.name;
            state.iconIndex = action.payload.iconId;
            state.habitType = action.payload.habitType;
            state.quantity = action.payload.quantity;
            state.isTimeBased = action.payload.isTimeBased;
            state.frequency = action.payload.frequency;
            state.repeatMode = action.payload.repeatMode;
            state.repeatDaysOfWeek = action.payload.repeatDaysOfWeek;
            state.repeatDaysOfMonth = action.payload.repeatDaysOfMonth;
            state.repeatInterval = action.payload.repeatInterval;
            state.startDate = action.payload.startDate;
            state.groupId = action.payload.groupId;
        }
}});

export const {
    changeName, 
    changeIcon,
    changeHabitType, 
    changeQuantity, 
    changeIsTimeBased, 
    changeFrequency,
    changeRepeatMode, 
    addRepeatDayOfWeek, 
    removeRepeatDayOfWeek, 
    clearRepeatDaysOfWeek,
    addRepeatDayOfMonth, 
    removeRepeatDayOfMonth,
    clearRepeatDaysOfMonth,
    changeRepeatInterval,
    changeStartDate,
    changeGroup,
    resetForm,
    fillForm} = goodHabitCreatorSlice.actions;
export const goodHabitCreatorReducer = goodHabitCreatorSlice.reducer;