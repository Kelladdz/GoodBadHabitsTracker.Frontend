import FilterBar from './FilterBar';
import HabitList from './HabitList';
import HabitsAccordion from './HabitsAccordion';

import { HABIT_TYPES } from '../../../constants/habits-properties';
import loadingAnimationData from '../../../assets/animations/loading-animation.json';

import styles from '../../../styles/MiddleSection.module.css';
import { useFetchHabitsQuery } from '../../../store/api/habitsApi';
import Lottie from 'lottie-react';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

const MiddleSection = () => {
    const {data, error, isLoading} = useFetchHabitsQuery() || [];

    const goodHabits = data && data.filter(item => item.entity.habitType === 0);
    const limitHabits = data && data.filter(item => item.entity.habitType === 1);
    const quitHabits = data && data.filter(item => item.entity.habitType === 2);

    if (data && !isLoading) {
        return (
            <div className={styles['middle-section']}>
                <FilterBar/>
                <HabitsAccordion type={HABIT_TYPES.good} habits={goodHabits}/>
                <HabitsAccordion type={HABIT_TYPES.limit} habits={limitHabits}/>
                <HabitsAccordion type={HABIT_TYPES.quit} habits={quitHabits}/>
            </div>
        );
    } else {
        return (
            <div className={styles['middle-section']}>
                <Lottie animationData={loadingAnimationData} />
            </div>);
    }
}

export default MiddleSection;