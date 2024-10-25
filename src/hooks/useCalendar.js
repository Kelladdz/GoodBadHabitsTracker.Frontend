import { findIndex } from 'lodash';
import { useEffect, useState } from 'react';
import { CALENDAR_TYPES } from '../constants/calendar-types';
import { useDispatch, useSelector } from 'react-redux';
import { changeStartDate } from '../store';
import { current } from '@reduxjs/toolkit';

export function useCalendar(type, cellSize) {
    const dispatch = useDispatch();
    const startDate = useSelector(state => state.goodHabitCreator.startDate);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarDays, setCalendarDays] = useState();

    const today = new Date();
    const currentMonth = currentDate.getMonth();
    const numberOfLastDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate();
    const numberOfLastDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();
    const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentMonth, 1).getDay();
    const lastDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDay();
    const lastDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDay();
    const lastSundayOfPreviousMonth = numberOfLastDayOfPreviousMonth - lastDayOfPreviousMonth + 1;
    const firstDayOnCalendar = firstDayOfCurrentMonth === 0 
        ? new Date(currentDate.getFullYear(), currentMonth, 1)
        : new Date(currentDate.getFullYear(), currentMonth - 1, lastSundayOfPreviousMonth);
    const numberOfAllDaysInCalendar = numberOfLastDayOfCurrentMonth + firstDayOfCurrentMonth;

    const calendarRows = numberOfLastDayOfCurrentMonth + firstDayOfCurrentMonth > 35 ? 6 : 5;
    
    const previousMonth = () => {
        const previousMonth = new Date(currentDate);
        previousMonth.setMonth(previousMonth.getMonth() - 1);
        if (type === CALENDAR_TYPES.form && previousMonth.getMonth() >= today.getMonth()) {
            setCurrentDate(previousMonth);
        }
    }

    const nextMonth = () => {
        const previousMonth = new Date(currentDate);
        previousMonth.setMonth(previousMonth.getMonth() + 1);
        setCurrentDate(previousMonth);
    }

    const handleDayClick = (day, index) => {
        console.log(day, 'day clicked');
        if (type !== CALENDAR_TYPES.main) {
            const selectedDate = new Date(day);
            console.log('Selected date', selectedDate);
            const today = new Date();
            const todayIndex = findIndex(calendarDays, (d) => d === today.getDate());
            console.log('Index of today', todayIndex);
            const selectedDayIndex = findIndex(calendarDays, (d) => d === day);
            console.log('Index of selected day', selectedDayIndex);
            if (selectedDate.getMonth() < currentDate.getMonth()) {
                previousMonth();
            } else if (selectedDate.getMonth() > currentDate.getMonth()) {
                nextMonth();
            } 
            if (type === CALENDAR_TYPES.form) {
                console.log('Want to change start date');
                dispatch(changeStartDate(day));
            }
            
        }
    }
    
    useEffect(() => {
        console.log('Current date', currentDate);
        let newCalendarDays = [];
        for (let i = 0; i < numberOfAllDaysInCalendar; i++) {
            const nextDay = new Date(firstDayOnCalendar.getFullYear(), firstDayOnCalendar.getMonth(), firstDayOnCalendar.getDate() + i);
            newCalendarDays.push(nextDay.toISOString().substring(0, 10));
        }
        setCalendarDays(newCalendarDays);
        
        
        
    }, [currentDate]);

    return { currentDate, startDate, today, numberOfLastDayOfCurrentMonth, firstDayOnCalendar, calendarDays, calendarRows, previousMonth, nextMonth, handleDayClick};
}