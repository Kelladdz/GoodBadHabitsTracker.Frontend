/* eslint-disable react/display-name */
import React, { useEffect, useContext, useState, useRef } from 'react';
import { useSpring, animated, useTransition } from 'react-spring';

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
import { useFetchHabitQuery } from '../../../store';
import ResultSurface from './ResultSurface';

const Calendar = React.forwardRef(({props, withoutArrows, headerPadding, type}, ref) => {
    const isSundayFirstDayOfWeek = useSelector(state => state.settings.isSundayFirstDayOfWeek);
    const currentDate = useSelector(state => state.calendar.currentDate);
    const currentDateString = currentDate.toISOString().substring(0, 10);
    const currentMonth = useSelector(state => state.calendar.currentMonth);
    const calendarDays = useSelector(state => state.calendar.calendarDays);
    const currentYear = useSelector(state => state.calendar.currentYear);
    const {activeHabit} = useContext(HabitContext);
    const {  today, startDate, resultDate, calendarRows, handlePreviousMonthClick, handleNextMonthClick, handleDayClick } = useCalendar(type);
    const gridRef = useRef();

    const {data, error, isLoading} = useFetchHabitQuery(activeHabit?.habit.id, {skip: activeHabit == null || type !== CALENDAR_TYPES.main}) || [];
    const [activeDivSprings, activeDivApi] = useSpring(() => ({ left: '0rem', top: '0rem', config: { duration: 100 } }));
    




    useEffect(() => {
        if (type === CALENDAR_TYPES.form && calendarDays && calendarDays.some(day => day === startDate)) {
            const index = calendarDays.findIndex(day => day === startDate);
            console.log('index: ', index);
            const row = Math.floor(index / 7);
            console.log('row = Math.floor(index / 7) = ', row);
            const column = index % 7;
            console.log('column = index % 7 = ', column);
            console.log('left: ', `${(column * 2)}rem`, 'top: ', `${row * 2}rem`);
            activeDivApi.start({ left: `${(column * 2)}rem`, top: `${row * 2}rem` });
        } else if (type === CALENDAR_TYPES.filter && calendarDays && calendarDays.some(day => day === currentDateString)) {
            const index = calendarDays.findIndex(day => day === currentDateString);
            console.log('index: ', index);
            const row = Math.floor(index / 7);
            console.log('row = Math.floor(index / 7) = ', row);
            const column = index % 7;
            console.log('column = index % 7 = ', column);
            console.log('left: ', `${(column * 2)}rem`, 'top: ', `${row * 2}rem`);
            activeDivApi.start({ left: `${(column * 2)}rem`, top: `${row * 2}rem` });
        } else if (type === CALENDAR_TYPES.logger && calendarDays && calendarDays.some(day => day === resultDate)) {
            const index = calendarDays.findIndex(day => day === resultDate);
            console.log('index: ', index);
            const row = Math.floor(index / 7);
            console.log('row = Math.floor(index / 7) = ', row);
            const column = index % 7;
            console.log('column = index % 7 = ', column);
            console.log('left: ', `${(column * 2)}rem`, 'top: ', `${row * 2}rem`);
            activeDivApi.start({ left: `${(column * 2)}rem`, top: `${row * 2}rem` });
        }
    },[startDate, resultDate, currentDateString, calendarDays]);


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
            <div className={styles['days-of-week']} >
                {isSundayFirstDayOfWeek ? DAYS_OF_WEEK_SHORT.map((day, index) => 
                <div className={styles['day-of-week-box']}>
                    <span key={index} className={styles['day-of-week']}>{day}</span>
                </div>) : ALTERNATE_DAYS_OF_WEEK_SHORT.map((day, index) => 
                <div className={styles['day-of-week-box']}>
                    <span key={index} className={styles['day-of-week']}>{day}</span>
                </div>)}
            </div>
            <div ref={gridRef} style={{gridTemplateRows: `repeat(${calendarRows}, minmax(2rem, 1fr))`, gridTemplateColumns: `repeat(7, 1fr)`}} className={styles['days-of-month']}>
                {calendarDays && calendarDays.map((day, index) => {
                    let disabledDayClass;
                    const row = Math.floor(index / 7);
                                            const column = index % 7;
                                            console.log(column);
                    switch (type){
                        case CALENDAR_TYPES.form:
                            disabledDayClass = new Date(day) < new Date(today.getFullYear(), today.getMonth(), today.getDate()) ? 'disabled-' : '';
                            break;
                        case CALENDAR_TYPES.filter:
                            disabledDayClass = new Date(day) < new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30) 
                            || new Date(day) > new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3) ? 'disabled-' : '';
                            break;
                        case CALENDAR_TYPES.logger:
                            disabledDayClass = new Date(day) > new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3) ? 'disabled-' : '';
                            break;
                        default:
                            break;
                    }
                    
                    let status;
                    console.log('activeHabit: ', data);
                    if (data && type === CALENDAR_TYPES.main && data.habit.dayResults && data.habit.dayResults.some(result => result.date === day)){
                        status = data.habit.dayResults.find(result => result.date === day).status;
                        console.log('status: ', day, status);
                    }
                    if (data && data.habit.dayResults.some(result => result.date === calendarDays[index + 1])){
                        console.log('tommorow: ', data.habit.dayResults.find(result => result.date === calendarDays[index + 1]).status)
                    }
                    let resultCircleColorClass;
                    switch (status) {
                        case 0:
                            resultCircleColorClass = 'completed'
                            break;
                        case 1:
                            resultCircleColorClass = 'failed'
                            break;
                        case 2:
                            resultCircleColorClass = 'skipped'
                            break;
                        default:
                            resultCircleColorClass = ''
                            break;
                    }
                    return <>
                     <div style={{width: `clamp(2rem, calc(100% / 7), 3rem)`, height: `clamp(2rem, calc(100% / ${calendarRows}), 3rem)`}} className={styles[`${disabledDayClass}day-of-month-box`]} onClick={() => handleDayClick(day)}>
                        <span key={index} className={styles['day-of-month']}>{day.split('-')[2]}</span>      
                        {data && type === CALENDAR_TYPES.main && data.habit.dayResults.some(result => result.date === day && result.status !== 3) &&
                            <div className={`${styles['circle']} ${styles[`${resultCircleColorClass}`]}`} style={{top: `${row * 2}rem`, left: `${(column)} calc(100% / 7) + 4}rem`}}></div>}
                        {data && type === CALENDAR_TYPES.main && data.habit.dayResults.some(dr => dr.date === day) && data.habit.dayResults.some(result => result.date === calendarDays[index + 1] && result.status === data.habit.dayResults.find(dr => dr.date === day).status) && 
                                <div className={`${styles['rectangle']} ${styles[`${resultCircleColorClass}`]}`} style={{top: `${row * 2}rem`, left: `${(column)} * (calc(100% / 7) + 4rem)`}}></div>                    
                                
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