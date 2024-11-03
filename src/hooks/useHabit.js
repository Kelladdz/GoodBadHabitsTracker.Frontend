import {useContext, useEffect, useState} from 'react';
import CalendarContext from '../context/calendar';
import { DAY_RESULTS_STATUSES } from '../constants/habits-properties';

export function useHabit(habit) {
    const {currentDateString} = useContext(CalendarContext);
    const [backgroundColor, setBackgroundColor] = useState('transparent');

    const [status, setStatus] = useState(DAY_RESULTS_STATUSES[3]);

    useEffect(() => {
        if (habit) {
            if (habit.dayResults.some(result => result.date === currentDateString && result.status === 0)) {
                setStatus(DAY_RESULTS_STATUSES[0]);
            } else if (habit.dayResults.some(result => result.date === currentDateString && result.status === 1)) {
                setStatus(DAY_RESULTS_STATUSES[1]);
            } else if (habit.dayResults.some(result => result.date === currentDateString && result.status === 2)) {
                setStatus(DAY_RESULTS_STATUSES[2]);
            } else {
                setStatus(DAY_RESULTS_STATUSES[3]);
            }
        }
    }, [habit, currentDateString]);

    useEffect(() => {
        switch (status) {
            case DAY_RESULTS_STATUSES[0]:
                setBackgroundColor('#53e05e');
                break;
            case DAY_RESULTS_STATUSES[1]:
                setBackgroundColor('#cb5050');
                break;
            case DAY_RESULTS_STATUSES[2]:
                setBackgroundColor('#2f3400');
                break;
            case DAY_RESULTS_STATUSES[3]:
                setBackgroundColor('transparent');
                break;
            default:
                break;
        }
    }, [status]);

    return {backgroundColor, status};
}