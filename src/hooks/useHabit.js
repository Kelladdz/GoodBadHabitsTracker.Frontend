import {useContext, useEffect, useState} from 'react';

import CalendarContext from '../context/calendar';

import { DAY_RESULT_STATUSES } from '../constants/habits-properties';

export function useHabit(habit) {
    const {currentDateString} = useContext(CalendarContext);

    const [backgroundColor, setBackgroundColor] = useState('transparent');
    const [status, setStatus] = useState(DAY_RESULT_STATUSES[3]);
    const [progressToDisplay , setProgressToDisplay] = useState();
    const [breakDays, setBreakDays] = useState(0);

    let today = new Date();
    today.setHours(0,0,0,0);
    today.setDate(today.getDate() + 1);
    today = today.toISOString().substring(0, 10);

    useEffect(() => {
        if (habit) {
            if (habit.dayResults.some(result => result.date === currentDateString && result.status === 0)) {
                setStatus(DAY_RESULT_STATUSES[0]);
            } else if (habit.dayResults.some(result => result.date === currentDateString && result.status === 1)) {
                setStatus(DAY_RESULT_STATUSES[1]);
            } else if (habit.dayResults.some(result => result.date === currentDateString && result.status === 2)) {
                setStatus(DAY_RESULT_STATUSES[2]);
            } else {
                setStatus(DAY_RESULT_STATUSES[3]);
            }

            if (habit.dayResults.some(result => result.date === currentDateString)) {
                console.log(habit.dayResults.find(result => result.date === currentDateString).progress)
                setProgressToDisplay(habit.isTimeBased ? habit.dayResults.find(result => result.date === currentDateString).progress / 60 : habit.dayResults.find(result => result.date === currentDateString).progress);
                
            }

            if (habit.dayResults && habit.habitType === 2) {
                let count = 0;
                const dayResults = habit.dayResults.filter(result => result).sort((a, b) => b.date.localeCompare(a.date));
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
                setBackgroundColor('transparent');
                break;
            default:
                break;
        }
    }, [status]);

    return {backgroundColor, status, progressToDisplay, breakDays};
}