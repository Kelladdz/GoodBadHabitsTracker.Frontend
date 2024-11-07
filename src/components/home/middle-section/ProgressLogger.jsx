import { useState, useContext, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { changeProgress, resetProgressLoggingForm, useUpdateDayResultMutation } from '../../../store';

import HabitsContext from '../../../context/habit';
import ProgressLoggerContext from '../../../context/progress-logger';
import ContextMenuContext from '../../../context/context-menu';

import { useProgressLoggerValidation } from '../../../hooks/useProgressLoggerValidation';

import StatusOptionsList from './StatusOptionsList';
import Calendar from '../shared/Calendar';
import ProgressLoggerDropdown from './ProgressLoggerDropdown';
import ProgressInput from './ProgressInput';

import { DAY_RESULT_PROPERTIES, DAY_RESULT_STATUSES } from '../../../constants/habits-properties';
import { CALENDAR_TYPES } from '../../../constants/calendar-types';
import { CANCEL_ICON_ALTERNATE_LABEL, CHECK_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import CancelIcon from '../../../assets/svg/cancel-icon.svg';
import CheckIcon from '../../../assets/svg/green-check-icon.svg';

import styles from '../../../styles/ProgressLogger.module.css';

const ProgressLogger = () => {
    const dispatch = useDispatch();
    const form = useSelector(state => state.progressLoggingForm);

    const {validationError, isValid} = useProgressLoggerValidation();

    const {activeHabit} = useContext(HabitsContext);
    const {toggleProgressLogger} = useContext(ProgressLoggerContext);
    const {hideContextMenu} = useContext(ContextMenuContext);

    const [updateDayResult, {isLoading: isUpdateDayResultLoading}] = useUpdateDayResultMutation();

    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const statusOptionsRef = useRef(null);
    const calendarRef = useRef(null);
    const statusDropdownRef = useRef(null);
    const calendarDropdownRef = useRef(null);

    const today = new Date().toISOString().substring(0, 10);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValid()) {
            const request = {
                id: activeHabit.id,
                index: activeHabit.dayResults.findIndex(result => result.date === form.date),
                date: form.date,
                progress: form.progress,
                status: form.status,
            }
    
            try {
                await updateDayResult(request).unwrap();
                dispatch(resetProgressLoggingForm());
                toggleProgressLogger(false);
                hideContextMenu();
            } catch (err) {
                throw new Error(err);
            } 
        }
    }

    const toggleStatusDropdown = () => {
        if (!isStatusDropdownOpen) {
            setIsStatusDropdownOpen(true);
        }
    }

    const toggleCalendar = () => {
        setIsCalendarOpen(true);
    }

    const handleCancelClick = () => {
        dispatch(resetProgressLoggingForm());
        toggleProgressLogger(false);
        hideContextMenu();
    }

    const handleClickOutsideDropdown = (e) => {
        if (statusOptionsRef.current && !statusOptionsRef.current.contains(e.target)
        && (statusDropdownRef.current && !statusDropdownRef.current.contains(e.target))) {
            setIsStatusDropdownOpen(false);
        } 

        if (calendarRef.current && !calendarRef.current.contains(e.target)) {
            setIsCalendarOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideDropdown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown);
        }
    }, []);

    useEffect(() => {
        if (activeHabit.habitType === 2) {
            dispatch(changeProgress(null));
        }
    },[activeHabit]);
    

    return (
        <div className={styles['progress-logger']} >
            <form className={styles.form} onSubmit={handleSubmit}>
                <div ref={statusDropdownRef} className={styles['input-box']}>
                    <span className={styles['box-label']}>{DAY_RESULT_PROPERTIES.status}</span>
                    <ProgressLoggerDropdown label={DAY_RESULT_STATUSES[form.status]} onClick={toggleStatusDropdown} content={isStatusDropdownOpen && <StatusOptionsList ref={statusOptionsRef} onClose={() => setIsStatusDropdownOpen(false)}/>}/>
                </div>
                {activeHabit.habitType !== 2 && <div className={styles['input-box']}>
                    <span className={styles['box-label']}>{DAY_RESULT_PROPERTIES.progress}</span>
                    <ProgressInput />
                </div>}
                <div ref={calendarDropdownRef} className={styles['input-box']}>
                    <span className={styles['box-label']}>{DAY_RESULT_PROPERTIES.date}</span>
                    <ProgressLoggerDropdown label={form.date === today ? 'Today' : form.date} onClick={toggleCalendar} content={isCalendarOpen && <Calendar ref={calendarRef} cellSize='2rem' headerPadding='0' type={CALENDAR_TYPES.logger}/>}/>
                </div>      
                <button className={styles.btn} type='submit'>
                    <img src={CheckIcon} alt={CHECK_ICON_ALTERNATE_LABEL}/>
                </button>
                <button className={styles.btn} type='button' onClick={handleCancelClick}>
                    <img src={CancelIcon} alt={CANCEL_ICON_ALTERNATE_LABEL}/>
                </button>
            </form>
            <div className={styles['error-box']}>
                <span className={styles.error}>{validationError}</span>
            </div>
        </div>
        
    );
}

export default ProgressLogger;