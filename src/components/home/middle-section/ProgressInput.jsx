import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeProgress } from '../../../store';

import HabitsContext from '../../../context/habit';

import {HABITS_QUANTITY_UNITS} from '../../../constants/habits-properties';

import styles from '../../../styles/ProgressInput.module.css';

const ProgressInput = () => {
    const dispatch = useDispatch();
    const progress = useSelector(state => state.progressLoggingForm.progress);

    const {activeHabit} = useContext(HabitsContext);

    const [inputValue, setInputValue] = useState(progress ? progress : 0);

    const unit = activeHabit.isTimeBased ? HABITS_QUANTITY_UNITS[0] : HABITS_QUANTITY_UNITS[1];

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) {
            setInputValue(1);
        } else {
            setInputValue(value);
        }
    }

    useEffect(() => {
        activeHabit && activeHabit.isTimeBased 
            ? dispatch(changeProgress(inputValue * 60))
            : dispatch(changeProgress(inputValue));
    }, [activeHabit, inputValue])

    return (
        <div className={styles['progress-input']}>
            <input type='number' className={styles.input} min={0} value={inputValue} onChange={handleInputChange}/>
            <div className={styles.unit}>
                <span className={styles['unit-label']}>{unit}</span>
            </div>
        </div>)
}

export default ProgressInput;