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
    
    const [update, isUpdateLoading] = useDailyUpdateMutation();

    const today = new Date();
    today.setHours(1,0,0,0);
    const todayString = today.toISOString().substring(0, 10);


    const dailyUpdate = () => {
        console.log(habits)
        if (habits) {
            habits.forEach(async habit => {
                let jsonDocs = [];
                
                let startDate = new Date(habit.startDate);
                startDate.setHours(1,0,0,0);
                console.log(today);
                while (startDate < today) {
                    if (!habit.dayResults.some(result => result.date === startDate.toISOString().substring(0, 10))) {
                        jsonDocs.push(habit.habitType !== 2 ? {
                            "op": "add",
                            "path": "/dayResults/-",
                            "value": {
                                "Progress": 0,
                                "Status": 1,
                                "Date": startDate.toISOString().substring(0, 10)
                            }
                        } : {
                            "op": "add",
                            "path": "/dayResults/-",
                            "value": {
                                "Status": 1,
                                "Date": startDate.toISOString().substring(0, 10)
                            }
                        });
                    }
                    else if (habit.dayResults.some(result => result.date === startDate.toISOString().substring(0, 10) && result.status === 3)) {
                            jsonDocs.push(habit.habitType !== 2 ? {
                                "op": "replace",
                                "path": "/dayResults",
                                "value": {
                                    "Progress": habit.dayResults.find(result => result.date === startDate.toISOString().substring(0,10)).progress,
                                    "Status": 1,
                                    "Date": startDate.toISOString().substring(0, 10)
                                }
                            } : {
                                "op": "replace",
                                "path": "/dayResults",
                                "value": {
                                    "Status": 1,
                                    "Date": startDate.toISOString().substring(0, 10)
                                }
                            });
                    } 
                    startDate.setDate(startDate.getDate() + 1);
                }
                if (!habit.dayResults.some(result => result.date === todayString)) {
                    jsonDocs.push(habit.habitType !== 2 ? {
                        "op": "add",
                        "path": "/dayResults/-",
                        "value": {
                            "Progress": 0,
                            "Status": 3,
                            "Date": todayString
                        }
                    } : {
                        "op": "add",
                        "path": "/dayResults/-",
                        "value": {
                            "Status": 3,
                            "Date": todayString
                        }
                    });
                }
                console.log(jsonDocs)
                if (jsonDocs.length === 0) return;
                try {
                    console.log('try');
                    await update({id: habit.id, docs: jsonDocs}).unwrap();
                } catch (error) {
                    throw new Error(error);
                }
            })
        }
    };

    useEffect(() => {
        if (habits) {
            dailyUpdate();
        }
    }, [habits]);


    if (habits && !isHabitsLoading) {
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
                        {filteredGoodHabits && filteredGoodHabits.length > 0 && <HabitsAccordion type={HABIT_TYPES.good} habits={filteredGoodHabits.filter(habit => habit.groupId === activeGroup.id)}/>}
                        {filteredLimitHabits && filteredLimitHabits.length > 0 && <HabitsAccordion type={HABIT_TYPES.limit} habits={filteredLimitHabits.filter(habit => habit.groupId === activeGroup.id)}/>}
                        {filteredQuitHabits && filteredQuitHabits.length > 0 && <HabitsAccordion type={HABIT_TYPES.quit} habits={filteredQuitHabits.filter(habit => habit.groupId === activeGroup.id)}/>}    
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