import React, { useEffect } from 'react';
import LeftArrow from '../../../assets/svg/arrow-left.svg';
import RightArrow from '../../../assets/svg/arrow-right.svg';

import { LEFT_ARROW_ALTERNATE_LABEL, RIGHT_ARROW_ALTERNATE_LABEL } from '../../../constants/alternate-labels';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_SHORT } from '../../../constants/days-of-week';
import { MONTHS } from '../../../constants/months';

import styles from '../../../styles/Calendar.module.css';
import CalendarContext from '../../../context/calendar';
import { useCalendar } from '../../../hooks/useCalendar';
import { CALENDAR_TYPES } from '../../../constants/calendar-types';
import { useSpring, animated } from 'react-spring';

const Calendar = React.forwardRef(({props, withoutArrows, cellSize, headerPadding, type}, ref) => {
    const { currentDate, currentDateString, today, startDate, calendarDays, calendarRows, previousMonth, nextMonth, handleDayClick, handleCurrentDateChange } = useCalendar(type, cellSize);
    const [activeDivSprings, activeDivApi] = useSpring(() => ({ left: '0.5rem', top: '0rem', config: { duration: 100 } }));

    
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
        }
    },[startDate, currentDateString, calendarDays]);

    return (
        <div ref={ref} className={styles.calendar}>
            <div style={withoutArrows ? {justifyContent: 'center', padding: headerPadding} : {padding: headerPadding}} className={styles.header}>
                {!withoutArrows && 
                <button type='button' className={styles['arrow-btn']} onClick={previousMonth}>
                    <img className={styles.arrow} src={LeftArrow} alt={LEFT_ARROW_ALTERNATE_LABEL}/>
                </button>}
                <span className={styles['current-month-box']}>{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
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
                    return <div /*style={startDate === day ? {backgroundColor: '#3662CC', color: 'white'} : {}}*/ className={styles[`${disabledDayClass}day-of-month-box`]} onClick={() => {
                    if (type === CALENDAR_TYPES.form && new Date(day) >= new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
                        handleDayClick(day)
                    } else if (type === CALENDAR_TYPES.filter) {
                        handleCurrentDateChange(day);
                    }}}>
                        <span key={index} className={styles['day-of-month']}>{day.split('-')[2]}</span>
                    </div>})}
                {(type === CALENDAR_TYPES.form || type === CALENDAR_TYPES.filter) && calendarDays && calendarDays.some(day => day === startDate || day === currentDateString) && <animated.div style={activeDivSprings} className={styles['floating-circle']}></animated.div>}
                
            </div>
        </div>  
    )
});

export default Calendar;