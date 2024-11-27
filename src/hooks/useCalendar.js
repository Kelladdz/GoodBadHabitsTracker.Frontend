import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeDate, changeStartDate } from '../store';

import CalendarContext from '../context/calendar';

import { CALENDAR_TYPES } from '../constants/calendar-types';

export function useCalendar(type) {
    const dispatch = useDispatch();
    const startDate = useSelector(state => state.goodHabitCreator.startDate);
    const resultDate = useSelector(state => state.progressLoggingForm.date);

    const isSundayFirstDayOfWeek = useSelector(state => state.settings.isSundayFirstDayOfWeek);

    const {currentDate, currentDateString, changeCurrentDate} = useContext(CalendarContext);

    const [calendarDays, setCalendarDays] = useState();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    const today = new Date();
    const numberOfLastDayOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const numberOfLastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDay();
    const lastSundayOfPreviousMonth = numberOfLastDayOfPreviousMonth - (lastDayOfPreviousMonth);

    const firstDayOnCalendar = firstDayOfCurrentMonth === 0 
        ? new Date(currentYear, currentMonth, 1)
        : new Date(currentYear, currentMonth - 1, isSundayFirstDayOfWeek ? lastSundayOfPreviousMonth : lastSundayOfPreviousMonth + 1);
    const numberOfAllDaysInCalendar = numberOfLastDayOfCurrentMonth + firstDayOfCurrentMonth;
    const calendarRows = numberOfAllDaysInCalendar > 35 ? 6 : 5;

    const previousMonth = () => {
        const previousMonth = currentMonth - 1
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(previousMonth);
        }
    }

    const nextMonth = () => {
        const nextMonth = currentMonth + 1
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(nextMonth);
        }
    }

    const handleDayClick = (day) => {
        if (type !== CALENDAR_TYPES.main) {
            const selectedDate = new Date(day);
            if (selectedDate.getMonth() < currentDate.getMonth()) {
                previousMonth();
            } else if (selectedDate.getMonth() > currentDate.getMonth()) {
                nextMonth();
            } 
            switch (type) {
                case CALENDAR_TYPES.form:
                    dispatch(changeStartDate(day));
                    break;
                case CALENDAR_TYPES.logger:
                    dispatch(changeDate(day));
                    break;
                case CALENDAR_TYPES.filter:
                    changeCurrentDate(selectedDate);
                    break;
            }
        }
    }
    
    useEffect(() => {
        let newCalendarDays = [];
        for (let i = 0; i < numberOfAllDaysInCalendar; i++) {
            const nextDay = new Date(firstDayOnCalendar.getFullYear(), firstDayOnCalendar.getMonth(), firstDayOnCalendar.getDate() + i + 1);
            newCalendarDays.push(nextDay.toISOString().substring(0, 10));
        }
        setCalendarDays(newCalendarDays); 
    }, [currentMonth, isSundayFirstDayOfWeek]);

    return { currentDate, currentMonth, currentDateString, startDate, resultDate, today, numberOfLastDayOfCurrentMonth, firstDayOnCalendar, calendarDays, calendarRows, previousMonth, nextMonth, handleDayClick};
}