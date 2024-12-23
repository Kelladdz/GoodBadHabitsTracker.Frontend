import React, { useEffect, useContext, useState } from 'react';
import { useSpring, animated } from 'react-spring';

import { useCalendar } from '../../../hooks/useCalendar';

import HabitContext from '../../../context/habit';

import { LEFT_ARROW_ALTERNATE_LABEL, RIGHT_ARROW_ALTERNATE_LABEL } from '../../../constants/alternate-labels';
import { ALTERNATE_DAYS_OF_WEEK_SHORT, DAYS_OF_WEEK_SHORT } from '../../../constants/days-of-week';
import { MONTHS } from '../../../constants/months';
import { CALENDAR_TYPES } from '../../../constants/calendar-types';

import LeftArrow from '../../../assets/svg/arrow-left.svg';
import RightArrow from '../../../assets/svg/arrow-right.svg';

import styles from '../../../styles/Calendar.module.css';
import ResultCircle from './ResultCircle';
import { useSelector } from 'react-redux';

const Calendar = React.forwardRef(({props, withoutArrows, cellSize, headerPadding, type}, ref) => {
    const isSundayFirstDayOfWeek = useSelector(state => state.settings.isSundayFirstDayOfWeek);
    const currentDate = useSelector(state => state.calendar.currentDate);
    const currentDateString = currentDate.toISOString().substring(0, 10);
    const currentMonth = useSelector(state => state.calendar.currentMonth);
    const calendarDays = useSelector(state => state.calendar.calendarDays);
    const currentYear = useSelector(state => state.calendar.currentYear);
    const {activeHabit, dayResults} = useContext(HabitContext);
    const {  today, startDate, resultDate, calendarRows, handlePreviousMonthClick, handleNextMonthClick, handleDayClick } = useCalendar(type);

    const [activeDivSprings, activeDivApi] = useSpring(() => ({ left: '0rem', top: '0rem', config: { duration: 100 } }));

    useEffect(() => {
        if (type === CALENDAR_TYPES.form && calendarDays && calendarDays.some(day => day === startDate)) {
            const index = calendarDays.findIndex(day => day === startDate);
            console.log('index: ', index);
            const row = Math.floor(index / 7);
            console.log('row = Math.floor(index / 7) = ', row);
            const column = index % 7;
            console.log('column = index % 7 = ', column);
            console.log('left: ', `${(column * 2) + 0.5}rem`, 'top: ', `${row * 2}rem`);
            activeDivApi.start({ left: `${(column * 2) + 0.5}rem`, top: `${row * 2}rem` });
        } else if (type === CALENDAR_TYPES.filter && calendarDays && calendarDays.some(day => day === currentDateString)) {
            const index = calendarDays.findIndex(day => day === currentDateString);
            console.log('index: ', index);
            const row = Math.floor(index / 7);
            console.log('row = Math.floor(index / 7) = ', row);
            const column = index % 7;
            console.log('column = index % 7 = ', column);
            console.log('left: ', `${(column * 2) + 0.5}rem`, 'top: ', `${row * 2}rem`);
            activeDivApi.start({ left: `${(column * 2) + 0.5}rem`, top: `${row * 2}rem` });
        } else if (type === CALENDAR_TYPES.logger && calendarDays && calendarDays.some(day => day === resultDate)) {
            const index = calendarDays.findIndex(day => day === resultDate);
            console.log('index: ', index);
            const row = Math.floor(index / 7);
            console.log('row = Math.floor(index / 7) = ', row);
            const column = index % 7;
            console.log('column = index % 7 = ', column);
            console.log('left: ', `${(column * 2) + 0.5}rem`, 'top: ', `${row * 2}rem`);
            activeDivApi.start({ left: `${(column * 2) + 0.5}rem`, top: `${row * 2}rem` });
        }
    },[startDate, resultDate, currentDateString, calendarDays]);

    useEffect(() => {
        
    },[dayResults]);


    return (
        <div ref={ref} className={styles.calendar}>
            <div style={withoutArrows ? {justifyContent: 'center', padding: headerPadding} : {padding: headerPadding}} className={styles.header}>
                {!withoutArrows && 
                <button type='button' className={styles['arrow-btn']} onClick={handlePreviousMonthClick}>
                    <img className={styles.arrow} src={LeftArrow} alt={LEFT_ARROW_ALTERNATE_LABEL}/>
                </button>}
                <span className={styles['current-month-box']}>{MONTHS[currentMonth]} {currentYear}</span>
                {!withoutArrows && 
                <button type='button' className={styles['arrow-btn']} onClick={handleNextMonthClick}>
                    <img className={styles.arrow} src={RightArrow} alt={RIGHT_ARROW_ALTERNATE_LABEL}/>
                </button>}
            </div>
            <div className={styles['days-of-week']}>
                {isSundayFirstDayOfWeek ? DAYS_OF_WEEK_SHORT.map((day, index) => 
                <div className={styles['day-of-week-box']}>
                    <span key={index} className={styles['day-of-week']}>{day}</span>
                </div>) : ALTERNATE_DAYS_OF_WEEK_SHORT.map((day, index) => 
                <div className={styles['day-of-week-box']}>
                    <span key={index} className={styles['day-of-week']}>{day}</span>
                </div>)}
            </div>
            <div style={{gridTemplateRows: `repeat(${calendarRows}, ${cellSize})`}} className={styles['days-of-month']}>
                {calendarDays && calendarDays.map((day, index) => {
                    let disabledDayClass;
                    switch (type){
                        case CALENDAR_TYPES.form:
                            disabledDayClass = new Date(day) < new Date(today.getFullYear(), today.getMonth(), today.getDate()) ? 'disabled-' : '';
                            break;
                        case CALENDAR_TYPES.filter:
                            disabledDayClass = new Date(day) < new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7) 
                            || new Date(day) > new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3) ? 'disabled-' : '';
                            break;
                        case CALENDAR_TYPES.logger:
                            disabledDayClass = new Date(day) > new Date(today.getFullYear(), today.getMonth(), today.getDate()) ? 'disabled-' : '';
                            break;
                        default:
                            break;
                    }
                    
                    let status;
                    console.log('activeHabit: ', activeHabit);
                    if (type === CALENDAR_TYPES.main && activeHabit.habit.dayResults && activeHabit.habit.dayResults.some(result => result.date === day)){
                        status = activeHabit.habit.dayResults.find(result => result.date === day).status;
                        console.log('status: ', day, status);
                    }
                    
                    return <>
                     <div className={styles[`${disabledDayClass}day-of-month-box`]} onClick={() => handleDayClick(day)}>
                        <span key={index} className={styles['day-of-month']}>{day.split('-')[2]}</span>      
                        {type === CALENDAR_TYPES.main && activeHabit.habit.dayResults.some(result => result.date === day) && 

<ResultCircle status={status}/>
}     
                    </div>
                    
                    </>
                    
                   })}
                {(type === CALENDAR_TYPES.form || type === CALENDAR_TYPES.filter || type === CALENDAR_TYPES.logger) && calendarDays && calendarDays.some(day => day === currentDateString) && <animated.div style={activeDivSprings} className={styles['floating-circle']}></animated.div>}
            </div>
        </div>  
    )
});

export default Calendar;