import { useState } from 'react';

import HabitList from './HabitList';

import Caret from '../../../assets/svg/caret.svg';

import { CARET_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import styles from '../../../styles/HabitsAccordion.module.css';

const HabitsAccordion = ({type, habits}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <div className={styles['habits-accordion']} onClick={handleClick}>
                <span className={styles.label}>{type} Habits</span>
                <img style={isOpen ? {transform: 'rotate(180deg)'} : {}} className={styles.icon} src={Caret} alt={CARET_ALTERNATE_LABEL}/>
            </div>
            <HabitList isOpen={isOpen} habits={habits}/>
        </>
        
    )
}

export default HabitsAccordion;