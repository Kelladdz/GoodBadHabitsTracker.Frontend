import FilterBar from './FilterBar';
import HabitList from './HabitList';
import HabitsAccordion from './HabitsAccordion';

import { HABIT_TYPES } from '../../../constants/habit-types';

import styles from '../../../styles/MiddleSection.module.css';


const MiddleSection = () => {
    return (
        <div className={styles['middle-section']}>
            <FilterBar/>
            <HabitsAccordion type={HABIT_TYPES.good} isOpen={true}/>
            <HabitList type={HABIT_TYPES.good}/>
            <HabitsAccordion type={HABIT_TYPES.limit}/>
            <HabitsAccordion type={HABIT_TYPES.quit}/>
        </div>
    );
}

export default MiddleSection;