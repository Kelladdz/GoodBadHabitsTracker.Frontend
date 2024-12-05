import { useContext, useEffect, useState } from 'react';
import Lottie from 'lottie-react';

import { useDailyUpdateMutation } from '../../../store';

import LeftBarContext from '../../../context/left-bar';

import useFilter from '../../../hooks/useFilter';

import FilterBar from './FilterBar';
import HabitsAccordion from './HabitsAccordion';

import { HABIT_TYPES } from '../../../constants/habits-properties';
import { LEFT_BAR_BUTTON_LABELS } from '../../../constants/button-labels';
import loadingAnimationData from '../../../assets/animations/loading-animation.json';

import styles from '../../../styles/MiddleSection.module.css';

const MiddleSection = () => {
    const {activeGroup} = useContext(LeftBarContext);
    const {habits, filteredGoodHabits, filteredLimitHabits, filteredQuitHabits, isHabitsLoading} = useFilter();
    
    


    if (habits && !isHabitsLoading) {
        console.log(filteredGoodHabits)
        return (
            <div className={styles['middle-section']}>
                <FilterBar/>
                {!activeGroup.id && activeGroup !== LEFT_BAR_BUTTON_LABELS.badHabits && <HabitsAccordion type={HABIT_TYPES.good} habits={filteredGoodHabits}/>}
                {!activeGroup.id && activeGroup !== LEFT_BAR_BUTTON_LABELS.goodHabits && 
                    <>
                        <HabitsAccordion type={HABIT_TYPES.limit} habits={filteredLimitHabits}/>
                        <HabitsAccordion type={HABIT_TYPES.quit} habits={filteredQuitHabits}/>
                    </>}
                {activeGroup.id && 
                    <>
                        {filteredGoodHabits && filteredGoodHabits.length > 0 && <HabitsAccordion type={HABIT_TYPES.good} habits={filteredGoodHabits.filter(habit => habit.habit.groupId === activeGroup.id)}/>}
                        {filteredLimitHabits && filteredLimitHabits.length > 0 && <HabitsAccordion type={HABIT_TYPES.limit} habits={filteredLimitHabits.filter(habit => habit.habit.groupId === activeGroup.id)}/>}
                        {filteredQuitHabits && filteredQuitHabits.length > 0 && <HabitsAccordion type={HABIT_TYPES.quit} habits={filteredQuitHabits.filter(habit => habit.habit.groupId === activeGroup.id)}/>}    
                    </>}
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