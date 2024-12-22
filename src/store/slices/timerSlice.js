import { createSlice } from '@reduxjs/toolkit';
import { COUNTING_DIRECTIONS, TIMER_STATES } from '../../constants/timer-properties';

const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        timerState: TIMER_STATES.init,
        countingDirection: COUNTING_DIRECTIONS.counterClockwise,
        endlessTimer: false,
        duration: 300,
        timeElapsed: 0,

    },
    reducers: {
        changeTimerState: (state, action) => {
            state.timerState = action.payload;
        },
        changeCountingDirection: (state, action) => {
            state.countingDirection = action.payload;
        },
        toggleEndlessTimer: (state, action) => {
            state.endlessTimer = action.payload;
            if (state.endlessTimer) {
                state.duration = null
            } else {
                state.duration = 300;
            }
            
        },
        changeDuration: (state, action) => {
            state.endlessTimer = action.payload;
        },
        durationIncrement: (state) => {
            state.duration = state.duration + 60;
        },
        durationDecrement: (state) => {
            if (state.duration - 60 !== 0) {
                state.duration = state.duration - 60;
            }
            
        },
        timeCount: (state, action) => {
            state.timeElapsed =  action.payload;
        },
        countingStartForGoodHabit: (state) => {
            state.timerState = TIMER_STATES.play;
            state.countingDirection = COUNTING_DIRECTIONS.counterClockwise;
        },
        countingStartForLimitHabit: (state) => {
            state.timerState = TIMER_STATES.play;
            state.countingDirection = COUNTING_DIRECTIONS.clockwise;
        },
        countingStartForEndlessTimer: (state) => {
            state.timerState = TIMER_STATES.play;
            state.countingDirection = COUNTING_DIRECTIONS.clockwise;
            state.endlessTimer = true;
            state.duration = null;
        },
        reset: (state) => {
            state.timerState = TIMER_STATES.init;
            state.countingDirection = COUNTING_DIRECTIONS.counterClockwise;
            state.endlessTimer = false;
            state.duration = 300;
            state.timeElapsed = 0;
        }
    }
})

export const {changeTimerState, changeCountingDirection, toggleEndlessTimer, 
    changeDuration, durationIncrement, durationDecrement, timeCount,
    countingStartForGoodHabit, countingStartForLimitHabit, countingStartForEndlessTimer, reset} = timerSlice.actions;
export const timerReducer = timerSlice.reducer;