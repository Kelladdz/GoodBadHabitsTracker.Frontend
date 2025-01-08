import { useContext, useEffect, useState } from 'react';
import Lottie from 'lottie-react';

import { useSearchHabitsQuery } from '../../../store';

import LeftBarContext from '../../../context/left-bar';

import useFilter from '../../../hooks/useFilter';

import FilterBar from './FilterBar';
import HabitsAccordion from './HabitsAccordion';

import { HABIT_TYPES } from '../../../constants/habits-properties';
import { LEFT_BAR_BUTTON_LABELS } from '../../../constants/button-labels';
import loadingAnimationData from '../../../assets/animations/loading-animation.json';

import styles from '../../../styles/MiddleSection.module.css';
import CalendarContext from '../../../context/calendar';
import { useSelector } from 'react-redux';
import HabitContext from '../../../context/habit';

const MiddleSection = () => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const {activeHabit, activeDetails} = useContext(HabitContext);
    const {activeGroup} = useContext(LeftBarContext);
    const currentDate = useSelector(state => state.calendar.currentDate);
    const currentDateString = currentDate.toISOString().substring(0, 10);
    
    const {searchString, goodHabits, limitHabits, quitHabits, sortHabitsByType} = useFilter();
    const {data, error, isLoading} = useSearchHabitsQuery({term: searchString, date: currentDateString}, {skip: !accessToken || !currentDate}) || [];
    
    useEffect(() => {
        if (data){
            console.log(data);
            sortHabitsByType(data);
        }
    }, [data])

    if (data) {
        console.log(data)
        return (
            <div className={`${styles['middle-section']} ${activeDetails ? styles.hide : ''}`}>
                <FilterBar/>
                {!activeGroup.id && activeGroup !== LEFT_BAR_BUTTON_LABELS.badHabits && <HabitsAccordion type={HABIT_TYPES.good} habits={goodHabits}/>}
                {!activeGroup.id && activeGroup !== LEFT_BAR_BUTTON_LABELS.goodHabits && 
                    <>
                        <HabitsAccordion type={HABIT_TYPES.limit} habits={limitHabits}/>
                        <HabitsAccordion type={HABIT_TYPES.quit} habits={quitHabits}/>
                    </>}
                {activeGroup.id && 
                    <>
                        {goodHabits && goodHabits.length > 0 && goodHabits.some(habit => habit.habit.groupId === activeGroup.id) && <HabitsAccordion type={HABIT_TYPES.good} habits={goodHabits.filter(habit => habit.habit.groupId === activeGroup.id)}/>}
                        {limitHabits && limitHabits.length > 0 && limitHabits.some(habit => habit.habit.groupId === activeGroup.id) && <HabitsAccordion type={HABIT_TYPES.limit} habits={limitHabits.filter(habit => habit.habit.groupId === activeGroup.id)}/>}
                        {quitHabits && quitHabits.length > 0 && quitHabits.some(habit => habit.habit.groupId === activeGroup.id) && <HabitsAccordion type={HABIT_TYPES.quit} habits={quitHabits.filter(habit => habit.habit.groupId === activeGroup.id)}/>}
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