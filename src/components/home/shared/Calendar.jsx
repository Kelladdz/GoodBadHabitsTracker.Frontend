import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import { useCalendar } from '../../../hooks/useCalendar';

import { LEFT_ARROW_ALTERNATE_LABEL, RIGHT_ARROW_ALTERNATE_LABEL } from '../../../constants/alternate-labels';
import { DAYS_OF_WEEK_SHORT } from '../../../constants/days-of-week';
import { MONTHS } from '../../../constants/months';
import { CALENDAR_TYPES } from '../../../constants/calendar-types';

import LeftArrow from '../../../assets/svg/arrow-left.svg';
import RightArrow from '../../../assets/svg/arrow-right.svg';

import styles from '../../../styles/Calendar.module.css';

const Calendar = React.forwardRef(({props, withoutArrows, cellSize, headerPadding, type}, ref) => {
    const { currentDate, currentDateString, currentMonth, today, startDate, resultDate, calendarDays, calendarRows, previousMonth, nextMonth, handleDayClick } = useCalendar(type);
    const [activeDivSprings, activeDivApi] = useSpring(() => ({ left: '0.5rem', top: '0rem', config: { duration: 100 } }));

    
    useEffect(() => {
        let index;
        if (type === CALENDAR_TYPES.form && calendarDays && calendarDays.some(day => day === startDate)) {
            index = calendarDays.findIndex(day => day === startDate);
        } else if (type === CALENDAR_TYPES.filter && calendarDays && calendarDays.some(day => day === currentDateString)) {
            index = calendarDays.findIndex(day => day === currentDateString);
        } else if (type === CALENDAR_TYPES.logger && calendarDays && calendarDays.some(day => day === resultDate)) {
            index = calendarDays.findIndex(day => day === resultDate);
        }

        const row = Math.floor(index / 7);
        const column = index % 7;
        activeDivApi.start({ left: `${(column * 2) + 0.5}rem`, top: `${row * 2}rem` });
    },[startDate, resultDate, currentDateString, calendarDays]);

    return (
        <div ref={ref} className={styles.calendar}>
            <div style={withoutArrows ? {justifyContent: 'center', padding: headerPadding} : {padding: headerPadding}} className={styles.header}>
                {!withoutArrows && 
                <button type='button' className={styles['arrow-btn']} onClick={previousMonth}>
                    <img className={styles.arrow} src={LeftArrow} alt={LEFT_ARROW_ALTERNATE_LABEL}/>
                </button>}
                <span className={styles['current-month-box']}>{MONTHS[currentMonth]} {currentDate.getFullYear()}</span>
                {!withoutArrows && 
                <button type='button' className={styles['arrow-btn']} onClick={nextMonth}>
                    <img className={styles.arrow} src={RightArrow} alt={RIGHT_ARROW_ALTERNATE_LABEL}/>
                </button>}
            </div>
            <div className={styles['days-of-week']}>
                {DAYS_OF_WEEK_SHORT.map((day, index) => 
                <div className={styles['day-of-week-box']}>
                    <span key={index} className={styles['day-of-week']}>{day}</span>
                </div>)}
            </div>
            <div style={{gridTemplateRows: `repeat(${calendarRows}, ${cellSize})`, gridTemplateColumns: `repeat(7, ${cellSize})`}} className={styles['days-of-month']}>
                {calendarDays && calendarDays.map((day, index) => {
                    const disabledDayClass = new Date(day) < new Date(today.getFullYear(), today.getMonth(), today.getDate()) && type === CALENDAR_TYPES.form ? 'disabled-' : '';
                    return <div className={styles[`${disabledDayClass}day-of-month-box`]} onClick={() => handleDayClick(day)}>
                        <span key={index} className={styles['day-of-month']}>{day.split('-')[2]}</span>
                    </div>})}
                {(type === CALENDAR_TYPES.form || type === CALENDAR_TYPES.filter || type === CALENDAR_TYPES.logger) && calendarDays && calendarDays.some(day => day === startDate || day === currentDateString) && <animated.div style={activeDivSprings} className={styles['floating-circle']}></animated.div>}
                
            </div>
        </div>  
    )
});

export default Calendar;