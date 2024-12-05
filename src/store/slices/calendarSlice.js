import { createSlice } from '@reduxjs/toolkit';

const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        currentDate: new Date(),
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        calendarDays: null,
        currentDay: null,
        firstDayOnCalendar: null,
    },
    reducers: {
        changeCurrentDate: (state, action) => {
            state.currentDate = action.payload;
            state.currentDay = action.payload.getDay();
        },
        previousMonth: (state) => {
            if (state.currentMonth === 0) {
                state.currentMonth = 11;
                state.currentYear = state.currentYear - 1;
            } else {
                state.currentMonth = state.currentMonth - 1;
            }
        },
        nextMonth: (state) => {
            if (state.currentMonth === 11) {
                state.currentMonth = 0;
                state.currentYear = state.currentYear + 1;
            } else {
                state.currentMonth = state.currentMonth + 1;
            }
        },
        setCalendarDays: (state, action) => {
            state.calendarDays = action.payload;
        },
        changeFirstDayOfWeekToMonday: (state) => {
            if (state.currentDay === null) {
                state.currentDay = new Date().getDay() - 1;
            } else {
                state.currentDay = state.currentDay + 1;
                state.calendarDays = state.calendarDays.map(day => {
                    const date = new Date(day);
                    date.setDate(date.getDate() + 1);
                    return date.toISOString().substring(0, 10);
                });
            }
        },
        changeFirstDayOfWeekToSunday: (state) => {
            if (state.currentDay === null) {
                state.currentDay = new Date().getDay();
            }
            else if (state.currentDay === 0) {
                state.currentDay = 6;
            } else {
                state.currentDay = state.currentDay - 1;
            }
        },
        setFirstDayOnCalendar: (state, action) => {
        }
    }
})

export const {changeCurrentDate, previousMonth, nextMonth, setCalendarDays, changeFirstDayOfWeekToMonday, changeFirstDayOfWeekToSunday, setFirstDayOnCalendar} = calendarSlice.actions;
export const calendarReducer = calendarSlice.reducer;