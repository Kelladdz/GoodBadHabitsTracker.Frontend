import { useContext, useEffect, useRef } from 'react';

import { useUpdateDayResultMutation } from '../../../store';

import ContextMenuContext from '../../../context/context-menu';
import CalendarContext from '../../../context/calendar';
import HabitContext from '../../../context/habit';
import ModalsContext from '../../../context/modals';

import { useHabit } from '../../../hooks/useHabit';

import HabitIcon from './HabitIcon';
import HabitInfo from './HabitInfo';
import HabitButton from './HabitButton';

import PlusSign from '../../../assets/svg/grey-plus-sign.svg';
import ThreeDots from '../../../assets/svg/three-dots.svg';
import CounterIcon from '../../../assets/svg/counter.svg';

import { CHECK_ICON_ALTERNATE_LABEL, THREE_DOTS_ALTERNATE_LABEL, COUNTER_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';
import { CONTEXT_MENU_TYPES } from '../../../constants/context-menu-types';
import { HABIT_ICONS_URLS } from '../../../constants/habit-icons';
import { DAY_RESULT_STATUSES } from '../../../constants/habits-properties';
import { MODAL_TYPES } from '../../../constants/modal-types';

import styles from '../../../styles/Habit.module.css';
import TimerContext from '../../../context/timer';

const Habit = ({habit}) => {
    const {toggleContextMenu} = useContext(ContextMenuContext);
    const {currentDateString} = useContext(CalendarContext)
    const {toggleHabit, streak, toggleDetails} = useContext(HabitContext);
    const {toggleModal} = useContext(ModalsContext);
    const {backgroundColor, status, progressToDisplay, quantityToDisplay, breakDays} = useHabit(habit);

    const [updateDayResult, isLoading] = useUpdateDayResultMutation();

    const habitRef = useRef();
    const buttonRef1 = useRef();
    const buttonRef2 = useRef();
    const buttonRef3 = useRef();

    const handleHabitClick = () => {
        toggleHabit(habit);
    }

    

    const resultButton = () => {
        if (habit.habit.isTimeBased) {
            return (
                <HabitButton ref={buttonRef2} onClick={handleTimerButtonClick}>
                    <img className={styles.icon} src={CounterIcon} alt={COUNTER_ICON_ALTERNATE_LABEL}/>
                    <span className={styles['btn-label']}>Timer</span>
                </HabitButton>
            )
        } else {
            return (
                <HabitButton ref={buttonRef3} onClick={handleIncrementButtonClick}>
                    <img className={styles.icon} src={PlusSign} alt={CHECK_ICON_ALTERNATE_LABEL}/>
                    <span className={styles['btn-label']}>1</span>
                </HabitButton>
            )
        }
    }

    const showContextMenu = (e) => {
        e.preventDefault();
        console.log(habit.habit)
        toggleHabit(habit);
        switch (status) {
            case DAY_RESULT_STATUSES[0]:
                toggleContextMenu(CONTEXT_MENU_TYPES.completedHabit, e.clientX - 108, e.clientY);
                break;
            case DAY_RESULT_STATUSES[1]:
                toggleContextMenu(CONTEXT_MENU_TYPES.failedHabit, e.clientX - 108, e.clientY);
                break;
            case DAY_RESULT_STATUSES[2]:
                toggleContextMenu(CONTEXT_MENU_TYPES.skippedHabit, e.clientX - 108, e.clientY);
                break;
            case DAY_RESULT_STATUSES[3]:
                toggleContextMenu(CONTEXT_MENU_TYPES.habit, e.clientX - 108, e.clientY);
                break;
            default:
                toggleContextMenu(CONTEXT_MENU_TYPES.habit, e.clientX - 108, e.clientY);
                break;
        }
    }

    const handleTimerButtonClick = () => {
        toggleModal(MODAL_TYPES.counter);
    }

    const handleIncrementButtonClick = async () => {
        const currentDayResult = habit.habit.dayResults.find(dr => dr.date === currentDateString);
        const progress = habit.habit.habitType !== 2 ? currentDayResult.progress + 1 : null;
        let status;
        if (habit.habit.habitType === 0){
            status = progress >= habit.habit.quantity ? 0 : 3;
        } else if (habit.habit.habitType === 1){
            status = progress < habit.habit.quantity ? 3 : 1;
        } else if (habit.habit.habitType === 2){
            status = 0;
        }
        
        try {
            await updateDayResult({habitId: habit.habit.id, id: currentDayResult.id, progress: progress, status: status}).unwrap();
        } catch (error) {
            throw new Error(error);
        }
    }

    const handleClickButtonDropdown = (e) => {
        if ((buttonRef1.current && buttonRef1.current.contains(e.target)) || (buttonRef2.current && buttonRef2.current.contains(e.target)) 
            || (buttonRef3.current && buttonRef3.current.contains(e.target))) {
            console.log('click button');
            toggleDetails(false);
        } else if (habitRef.current && habitRef.current.contains(e.target) && ((buttonRef1.current && !buttonRef1.current.contains(e.target)) || (buttonRef2.current && !buttonRef2.current.contains(e.target)) || (buttonRef3.current && !buttonRef3.current.contains(e.target)))) {
            console.log('click habit');
            toggleDetails(true);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickButtonDropdown);
        return () => {
            document.removeEventListener('click', handleClickButtonDropdown);
        }
    },[]);


    return (
        <div ref={habitRef} style={{backgroundColor: backgroundColor}} className={styles.habit} onClick={handleHabitClick} onContextMenu={showContextMenu}>
            <div className={styles.info}>
                <HabitIcon icon={HABIT_ICONS_URLS[habit.habit.iconId]}/>
                <HabitInfo name={habit.habit.name} habitType={habit.habit.habitType} progress={progressToDisplay} breakDays={breakDays} quantity={quantityToDisplay}/>
            </div>
            <div className={styles.btns}>
                {status === DAY_RESULT_STATUSES[3] && resultButton()}
                <HabitButton ref={buttonRef1} onClick={showContextMenu}>
                    <img className={styles.icon} src={ThreeDots} alt={THREE_DOTS_ALTERNATE_LABEL}/>
                </HabitButton>
            </div>
        </div>
    )
}

export default Habit;