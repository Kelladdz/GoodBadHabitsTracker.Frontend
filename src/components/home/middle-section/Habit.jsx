import { useContext, useEffect } from 'react';

import { useAddDayResultMutation } from '../../../store';

import ContextMenuContext from '../../../context/context-menu';
import CalendarContext from '../../../context/calendar';
import HabitContext from '../../../context/habit';

import { useHabit } from '../../../hooks/useHabit';

import HabitIcon from './HabitIcon';
import HabitInfo from './HabitInfo';
import HabitButton from './HabitButton';

import CheckIcon from '../../../assets/svg/check-icon.svg';
import ThreeDots from '../../../assets/svg/three-dots.svg';
import CounterIcon from '../../../assets/svg/counter.svg';

import { CHECK_ICON_ALTERNATE_LABEL, THREE_DOTS_ALTERNATE_LABEL, COUNTER_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';
import { CONTEXT_MENU_TYPES } from '../../../constants/context-menu-types';
import { HABIT_ICONS_URLS } from '../../../constants/habit-icons';
import { DAY_RESULT_STATUSES } from '../../../constants/habits-properties';

import styles from '../../../styles/Habit.module.css';

const Habit = ({habit}) => {
    const {toggleContextMenu} = useContext(ContextMenuContext);
    const {currentDateString} = useContext(CalendarContext)
    const {toggleHabit} = useContext(HabitContext);

    const {backgroundColor, status, progressToDisplay, breakDays} = useHabit(habit);

    const [newDayResult, {isLoading: isnewDayResultLoading}] = useAddDayResultMutation(); 

    const handleHabitClick = () => {
        toggleHabit(habit);
    }

    const resultButton = () => {
        if (habit.isTimeBased) {
            return (
                <HabitButton onClick={handleTimerButtonClick}>
                    <img className={styles.icon} src={CounterIcon} alt={COUNTER_ICON_ALTERNATE_LABEL}/>
                    <span className={styles['btn-label']}>Timer</span>
                </HabitButton>
            )
        } else {
            return (
                <HabitButton onClick={handleDoneButtonClick}>
                    <img className={styles.icon} src={CheckIcon} alt={CHECK_ICON_ALTERNATE_LABEL}/>
                    <span className={styles['btn-label']}>Done</span>
                </HabitButton>
            )
        }
    }

    const showContextMenu = (e) => {
        e.preventDefault();
        toggleHabit(habit);
        switch (status) {
            case DAY_RESULT_STATUSES[0]:
                toggleContextMenu(CONTEXT_MENU_TYPES.completedHabit, e.clientX, e.clientY);
                break;
            case DAY_RESULT_STATUSES[1]:
                toggleContextMenu(CONTEXT_MENU_TYPES.failedHabit, e.clientX, e.clientY);
                break;
            case DAY_RESULT_STATUSES[2]:
                toggleContextMenu(CONTEXT_MENU_TYPES.skippedHabit, e.clientX, e.clientY);
                break;
            default:
                toggleContextMenu(CONTEXT_MENU_TYPES.habit, e.clientX, e.clientY);
                break;
        }
        
    }

    const handleTimerButtonClick = () => {
        console.log('Timer button clicked')
    }

    const handleDoneButtonClick = async () => {
        try {
            await newDayResult({id: habit.id, progress: habit.quantity, status: 0, date: currentDateString}).unwrap();
        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        <div style={{backgroundColor: backgroundColor}} className={styles.habit} onClick={handleHabitClick} onContextMenu={showContextMenu}>
            <div className={styles.info}>
                <HabitIcon icon={HABIT_ICONS_URLS[habit.iconId]}/>
                <HabitInfo name={habit.name} habitType={habit.habitType} progress={progressToDisplay} breakDays={breakDays} quantity={habit.quantity} isTimeBased={habit.isTimeBased}/>
            </div>
            <div className={styles.btns}>
                {status === DAY_RESULT_STATUSES[3] && resultButton()}
                <HabitButton onClick={showContextMenu}>
                    <img className={styles.icon} src={ThreeDots} alt={THREE_DOTS_ALTERNATE_LABEL}/>
                </HabitButton>
            </div>
        </div>
    )
}

export default Habit;