import {useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import CalendarContext from '../context/calendar';

import { DAY_RESULT_STATUSES } from '../constants/habits-properties';
import { set } from 'lodash';
import { useAddDayResultMutation } from '../store';

export function useHabit(habit) {
    const currentDate = useSelector(state => state.calendar.currentDate);
    const currentDateString = currentDate.toISOString().substring(0, 10);

    const [backgroundColor, setBackgroundColor] = useState('transparent');
    const [status, setStatus] = useState(DAY_RESULT_STATUSES[3]);
    const [progressToDisplay , setProgressToDisplay] = useState('00:00');
    const [quantityToDisplay, setQuantityToDisplay] = useState(habit.habit.quantity);
    const [breakDays, setBreakDays] = useState(0);
    const [addDayResult, isLoading] = useAddDayResultMutation(undefined, {skip: status !== DAY_RESULT_STATUSES[4]});

    let today = new Date();
    today.setHours(0,0,0,0);
    today.setDate(today.getDate() + 1);
    today = today.toISOString().substring(0, 10);

    useEffect(() => {
        if (habit) {
            console.log(habit)
            if (habit.habit.dayResults.some(result => result.date === currentDateString && result.status === 0)) {
                setStatus(DAY_RESULT_STATUSES[0]);
            } else if (habit.habit.dayResults.some(result => result.date === currentDateString && result.status === 1)) {
                setStatus(DAY_RESULT_STATUSES[1]);
            } else if (habit.habit.dayResults.some(result => result.date === currentDateString && result.status === 2)) {
                setStatus(DAY_RESULT_STATUSES[2]);
            } else if (habit.habit.dayResults.some(result => result.date === currentDateString && result.status === 3)) {
                setStatus(DAY_RESULT_STATUSES[3]);
            } else {
                addDayResult({habitId: habit.habit.id, date: currentDateString, status: 3, progress: 0});
            }

            if (habit.habit.dayResults.some(result => result.date === currentDateString)) {
                const currentDayResult = habit.habit.dayResults.find(result => result.date === currentDateString);
                console.log(currentDayResult.progress)
                if (habit.habit.isTimeBased) {
                    const minutes = Math.floor(currentDayResult.progress / 60);
                    const remainingSeconds = currentDayResult.progress % 60;
                    setProgressToDisplay(`${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`);
                    setQuantityToDisplay(`${habit.habit.quantity / 60 > 9 ? '' : '0'}${habit.habit.quantity / 60} minutes`);
                } else {
                    setProgressToDisplay(currentDayResult.progress);
                    setQuantityToDisplay(`${habit.habit.quantity} times`);
                }
                
                
            }

            if (habit.habit.dayResults && habit.habit.habitType === 2) {
                let count = 0;
                const dayResults = habit.habit.dayResults.filter(result => result).sort((a, b) => b.date.localeCompare(a.date));
                dayResults.forEach((result, index) => {
                    if (result.status === 0) {
                        count++;
                    } if (result.status !== 0 && currentDateString !== today) {
                        setBreakDays(count);
                    }
                })
            }
        }
    }, [habit, currentDateString]);

    useEffect(() => {
        switch (status) {
            case DAY_RESULT_STATUSES[0]:
                setBackgroundColor('#53e05e');
                break;
            case DAY_RESULT_STATUSES[1]:
                setBackgroundColor('#cb5050');
                break;
            case DAY_RESULT_STATUSES[2]:
                setBackgroundColor('#2f3400');
                break;
            case DAY_RESULT_STATUSES[3]:
                setBackgroundColor('#d9d9d9');
                break;
            case DAY_RESULT_STATUSES[4]:
                setBackgroundColor('transparent');
                break;
            default:
                break;
        }
    }, [status]);

    return {backgroundColor, status, progressToDisplay, quantityToDisplay, breakDays};
}