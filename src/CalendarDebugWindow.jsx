import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFirstDayOnCalendar } from "./store";
import ProgressLoggerContext from "./context/progress-logger";
import HabitCreatorContext from "./context/habit-creator";

import styles from "./styles/DebugWindow.module.css";

export const CalendarDebugWindow = () => {
    const dispatch = useDispatch();
    const isSundayFirstDayOfWeek = useSelector(state => state.settings.isSundayFirstDayOfWeek);
    const calendarState = useSelector(state => state.calendar);
    const currentDate = calendarState.currentDate;
    const currentDateString = currentDate.toISOString().substring(0, 10);
    const currentMonth = calendarState.currentMonth;
    const calendarDays = calendarState.calendarDays;
    const currentYear = calendarState.currentYear;
    const currentDay = calendarState.currentDay;
    const calendarFirstDay = calendarState.firstDayOnCalendar;

    const today = new Date();
    const numberOfLastDayOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const numberOfLastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDay();
    const lastSundayOfPreviousMonth = numberOfLastDayOfPreviousMonth - lastDayOfPreviousMonth;

    
    const numberOfAllDaysInCalendar = numberOfLastDayOfCurrentMonth + firstDayOfCurrentMonth;
    const calendarRows = numberOfAllDaysInCalendar > 35 ? 6 : 5;

    useEffect(() => {
        dispatch(setFirstDayOnCalendar(isSundayFirstDayOfWeek));
    },[isSundayFirstDayOfWeek])

    return (
        <div className={styles['debug-window']}>
            <span>Is Sunday First Day Of Week?: {isSundayFirstDayOfWeek.toString()}</span>
            <span>Current Date String: {currentDateString}</span>
            <span>Current Month: {currentMonth}</span>
            <span>Current Year: {currentYear}</span>
            <span>Calendar Days: {calendarDays}</span>
            <span>Current Day: {currentDay}</span>
            <span>Number Of Last Day Of Current Month {numberOfLastDayOfCurrentMonth}</span>
            <span>Number Of Last Day Of Previous Month: {numberOfLastDayOfPreviousMonth}</span>
            <span>First Day Of Current Month: {firstDayOfCurrentMonth}</span>
            <span>Last Day Of Previous Month: {lastDayOfPreviousMonth}</span>
            <span>Last Sunday Of Previous Month: {lastSundayOfPreviousMonth}</span>
            <span>First Day On Calendar: {calendarFirstDay ? calendarFirstDay.toISOString().substring(0, 10) : null}</span>
            <span>Number Of All Days In Calendar: {numberOfAllDaysInCalendar}</span>
            <span>Calendar Rows: {calendarRows}</span>
        </div> 
    );
}

export default CalendarDebugWindow;