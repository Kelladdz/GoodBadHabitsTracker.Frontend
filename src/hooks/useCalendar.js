import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeDate, changeStartDate, changeCurrentDate, previousMonth, nextMonth, setCalendarDays, changeFirstDayOfWeekToSunday, changeFirstDayOfWeekToMonday, changeCurrentYear } from '../store';

import { CALENDAR_TYPES } from '../constants/calendar-types';


export function useCalendar(type) {
    const dispatch = useDispatch();
    const startDate = useSelector(state => state.goodHabitCreator.startDate);
    const resultDate = useSelector(state => state.progressLoggingForm.date);

    const isSundayFirstDayOfWeek = useSelector(state => state.settings.isSundayFirstDayOfWeek);

    const currentDate = useSelector(state => state.calendar.currentDate);
    const currentDateString = currentDate.toISOString().substring(0, 10);
    const currentMonth = useSelector(state => state.calendar.currentMonth);
    const calendarDays = useSelector(state => state.calendar.calendarDays);
    const currentYear = useSelector(state => state.calendar.currentYear);
    const currentDay = useSelector(state => state.calendar.currentDay);

    const today = new Date();
    today.setHours(1,0,0,0);
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);
    const numberOfLastDayOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const numberOfLastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDay();
    const lastSundayOfPreviousMonth = numberOfLastDayOfPreviousMonth - (lastDayOfPreviousMonth);

    const firstDayOnCalendar = firstDayOfCurrentMonth === 0 
        ? new Date(currentYear, currentMonth, 1)
        : new Date(currentYear, currentMonth - 1, isSundayFirstDayOfWeek ? lastSundayOfPreviousMonth : lastSundayOfPreviousMonth + 1);
    const numberOfAllDaysInCalendar = numberOfLastDayOfCurrentMonth + (6 - new Date(currentYear, currentMonth + 1, 0).getDay()) + firstDayOfCurrentMonth;
    const calendarRows = numberOfAllDaysInCalendar > 35 ? 6 : 5;

    const handlePreviousMonthClick = () => {
            if (currentMonth === 0){
                dispatch(changeCurrentYear(currentYear - 1))
            }
           dispatch(previousMonth());
    }

    const handleNextMonthClick = () => {
        if (currentMonth === 11){
            dispatch(changeCurrentYear(currentYear + 1))
        }
        dispatch(nextMonth());
    }

    const handleDayClick = (day) => {
        if (type !== CALENDAR_TYPES.main) {
            const selectedDate = new Date(day);
            selectedDate.setHours(25,0,0,0);
            if (selectedDate.getMonth() > currentMonth || (selectedDate.getMonth() === 11 && currentMonth === 0)) {
                handlePreviousMonthClick();
            } else if (selectedDate.getMonth() < currentMonth || (selectedDate.getMonth() === 0 && currentMonth === 11)) {
                handleNextMonthClick();
            }
            switch (type) {
                case CALENDAR_TYPES.form:
                    console.log(selectedDate)
                    console.log(today)
                    if (selectedDate >= today) {
                        dispatch(changeStartDate(selectedDate.toISOString().substring(0, 10)));
                    }
                    
                    break;
                case CALENDAR_TYPES.logger:
                    dispatch(changeDate(selectedDate.toISOString().substring(0, 10)));
                    break;
                case CALENDAR_TYPES.filter:
                    console.log(selectedDate <= tomorrow);
                    if (selectedDate <= tomorrow) {
                        dispatch(changeCurrentDate(selectedDate));
                    }
                    break;
            }
        }
    }
    
    useEffect(() => {
        console.log('previousMonth: ', currentMonth);
        let newCalendarDays = [];
        for (let i = 0; i < numberOfAllDaysInCalendar; i++) {
            const nextDay = new Date(firstDayOnCalendar.getFullYear(), firstDayOnCalendar.getMonth(), firstDayOnCalendar.getDate() + i + 1);
            newCalendarDays.push(nextDay.toISOString().substring(0, 10));
        }
        dispatch(setCalendarDays(newCalendarDays)); 
    }, [currentMonth, isSundayFirstDayOfWeek]);

    useEffect(() => {
        isSundayFirstDayOfWeek ? dispatch(changeFirstDayOfWeekToSunday()) : dispatch(changeFirstDayOfWeekToMonday());  
        const firstDayOnCalendar = firstDayOfCurrentMonth === 0 
        ? new Date(currentYear, currentMonth, 2)
        : new Date(currentYear, currentMonth, isSundayFirstDayOfWeek ? lastSundayOfPreviousMonth : lastSundayOfPreviousMonth + 1);
    },[isSundayFirstDayOfWeek]);    


    return { currentDate, currentDateString, startDate, resultDate, today, numberOfLastDayOfCurrentMonth, firstDayOnCalendar, calendarDays, calendarRows, handlePreviousMonthClick, handleNextMonthClick, handleDayClick};
}