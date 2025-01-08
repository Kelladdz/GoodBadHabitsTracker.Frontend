import { useContext, useEffect, useRef, useState } from 'react';

import styles from '../../../styles/ResultSurface.module.css';
import { useSelector } from 'react-redux';
import ResultCircle from './ResultCircle';
import { useFetchHabitQuery } from '../../../store';
import HabitContext from '../../../context/habit';

const ResultSurface = () => {

    const {activeHabit} = useContext(HabitContext);
    const calendarDays = useSelector(state => state.calendar.calendarDays);
    const ref = useRef();
    const [cellWidth, setCellWidth] = useState()
    const {data, error, isLoading} = useFetchHabitQuery(activeHabit?.habit.id, {skip: activeHabit == null}) || [];

    useEffect(() => {
        if (ref.current) {
            console.log(ref);
            setCellWidth(ref.current.scrollWidth / 7)
        } else setCellWidth(2.39 * 16)
    },[ref])

    useEffect(() => {
        console.log(cellWidth)
    },[cellWidth])

    return (
        <div ref={ref} className={styles['result-surface']}>
            {calendarDays && calendarDays.map((day, index) => {
                const row = Math.floor(index / 7);
                const column = index % 7;
                console.log(column);
                    return <div className={styles.circle} style={{top: `${row * 2}rem`, left: `${(column * cellWidth) + 4}px`}}></div>
                
                
            })}
        </div>
    );
}

export default ResultSurface;