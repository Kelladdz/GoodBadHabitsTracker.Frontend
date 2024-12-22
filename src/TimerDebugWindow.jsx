import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ProgressLoggerContext from "./context/progress-logger";
import HabitCreatorContext from "./context/habit-creator";

import styles from "./styles/DebugWindow.module.css";
import HabitContext from "./context/habit";
import CalendarContext from "./context/calendar";
import { TIMER_STATES } from "./constants/timer-properties";

export const TimerDebugWindow = () => {
    const timer = useSelector(state => state.timer);
    const [timeElapsed, setTimeElapsed] = useState(0);

    const {activeHabit} = useContext(HabitContext)
    const {currentDateString} = useContext(CalendarContext);
    const currentDayResult = activeHabit.habit.dayResults.find(dr => dr.date === currentDateString) 

    let remainingTime = timer.duration ? timer.duration - timer.timeElapsed : null;
    let remainingMinutes, displayRemainingSeconds;

    if (remainingTime) {
        remainingMinutes = Math.floor(remainingTime / 60);
        displayRemainingSeconds = remainingTime % 60;    
    }    
    const isLimitHabitComplete = timer.timeElapsed <= activeHabit.habit.quantity && activeHabit.habit.habitType === 1;
    const isGoodHabitComplete = timer.duration >= activeHabit.habit.quantity && activeHabit.habit.habitType === 0
    useEffect(() => {
            let countingInterval
            if (timer.timerState === TIMER_STATES.play) {
                countingInterval = setInterval(() => {
                    setTimeElapsed(prev => prev + 1)
                }, 1000);
            }else if (timer.timerState === TIMER_STATES.stop || timer.timerState === TIMER_STATES.finish) {
                clearInterval(countingInterval);
            }
            return () => {
                clearInterval(countingInterval);
            } 
    
        },[timer.timerState]);
    return (
        <div className={styles['debug-window']}>
            <span>Timer State: {timer.timerState}</span>
            <span>Duration: {timer.duration}</span>
            <span>Time Elapsed: {timeElapsed}</span>
            <span>Remaining Time: {remainingTime}</span>
            <span>Remaining Minutes: {remainingMinutes}</span>
            <span>Display Remaining Seconds: {displayRemainingSeconds}</span>
            <span>Is Endless Timer: {timer.endlessTimer.toString()}</span>
            <span>Counting Direction: {timer.countingDirection}</span>  
            <span>Is Good Habit Complete: {isGoodHabitComplete}</span>      
            <span>Is Limit Habit Complete: {isLimitHabitComplete}</span>
            <span>Status: {currentDayResult.status}</span>
            <span>Progress: {currentDayResult.progress}</span>
            <span>Date: {currentDayResult.date}</span>
        </div> 
    );
}

export default TimerDebugWindow;