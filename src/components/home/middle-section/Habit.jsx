import { useContext, useEffect } from 'react';

import ContextMenuContext from '../../../context/context-menu';
import CalendarContext from '../../../context/calendar';

import HabitIcon from './HabitIcon';
import HabitInfo from './HabitInfo';
import HabitButton from './HabitButton';

import CheckIcon from '../../../assets/svg/check-icon.svg';
import ThreeDots from '../../../assets/svg/three-dots.svg';
import QuestionMark from '../../../assets/svg/question-mark.svg';

import { CHECK_ICON_ALTERNATE_LABEL, THREE_DOTS_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import styles from '../../../styles/Habit.module.css';
import { CONTEXT_MENU_TYPES } from '../../../constants/context-menu-types';
import { HABIT_ICONS_URLS } from '../../../constants/habit-icons';

const Habit = ({habit}) => {
    const {toggleContextMenu} = useContext(ContextMenuContext);
    const {currentDateString} = useContext(CalendarContext)

    
    const progress = habit && habit.dayResults.some(result => result.date === currentDateString) 
        ? habit.dayResults.find(result => result.date === currentDateString).progress
        : 0;

    const showContextMenu = (e) => {
        e.preventDefault();
        toggleContextMenu(CONTEXT_MENU_TYPES.habit, e.clientX, e.clientY);
    }

    useEffect(() => {
        if (habit) {
            console.log('habit', habit)
        }
    },[habit])

    return (
        <div className={styles.habit} onContextMenu={showContextMenu}>
            <div className={styles.info}>
                <HabitIcon icon={HABIT_ICONS_URLS[habit.iconId]}/>
                <HabitInfo name={habit.name} progress={progress} quantity={habit.quantity}/>
            </div>
            <div className={styles.btns}>
                <HabitButton>
                    <img className={styles.icon} src={CheckIcon} alt={CHECK_ICON_ALTERNATE_LABEL}/>
                    <span className={styles['btn-label']}>Done</span>
                </HabitButton>
                <HabitButton>
                    <img className={styles.icon} src={ThreeDots} alt={THREE_DOTS_ALTERNATE_LABEL}/>
                </HabitButton>
            </div>
        </div>
    )
}

export default Habit;