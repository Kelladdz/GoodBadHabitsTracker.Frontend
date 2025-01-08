import {useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import { useFetchHabitQuery } from '../store';

import HabitContext from '../context/habit';

import { DAY_RESULT_STATUSES } from '../constants/habits-properties';

export function useHabit(habit) {
    const currentDate = useSelector(state => state.calendar.currentDate);
    const currentDateString = currentDate.toISOString().substring(0, 10);

    const [backgroundColor, setBackgroundColor] = useState('transparent');
    const [infoFontColor, setInfoFontColor] = useState('#828282')
    const [status, setStatus] = useState();
    const [breakDays, setBreakDays] = useState(0);

    let today = new Date();
    today.setHours(0,0,0,0);
    today.setDate(today.getDate() + 1);
    today = today.toISOString().substring(0, 10);

    const getProgressToDisplay = () => {
        if (habit.habit.dayResults.some(result => result.date === currentDateString)) {
            const currentDayResult = habit.habit.dayResults.find(result => result.date === currentDateString);
            if (habit.habit.isTimeBased) {
                const minutes = Math.floor(currentDayResult.progress / 60);
                const remainingSeconds = currentDayResult.progress % 60;

                return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
            } else {
                return currentDayResult.progress;
            }
        } else {
            if (habit.habit.isTimeBased) {
                return '00:00';
            } else {
                return 0;
            }
        }
    }

    const getQuantityToDisplay = () => {

            if (habit.habit.isTimeBased) {
                return `${habit.habit.quantity / 60 > 9 ? '' : '0'}${habit.habit.quantity / 60}:00 minutes`;
            } else {
                return `${habit.habit.quantity} times`;
            }
        
    }

    const getBreakDays = () => {
        if (habit.habit.habitType === 2) {
        let count = 0;
        let results = habit.habit.dayResults.filter(result => result).sort((a, b) => b.date.localeCompare(a.date));
        console.log('results: ', results);
        for (let i = 0; i < results.length; i++) {
            if (results[i].status === 0) {
                count++;
                continue;
            } else if (results[i].status !== 0) {
                if (count === 0) {
                    continue;
                } else {
                    break;
                }
            }
        }
        setBreakDays(count);
    }
}

    const progressToDisplay = getProgressToDisplay();
    const quantityToDisplay = getQuantityToDisplay();

    useEffect(() => {

            console.log(habit)
            if (habit.habit.dayResults.some(result => result.date === currentDateString && result.status === 0)) {
                setStatus(DAY_RESULT_STATUSES[0]);
            } else if (habit.habit.dayResults.some(result => result.date === currentDateString && result.status === 1)) {
                setStatus(DAY_RESULT_STATUSES[1]);
            } else if (habit.habit.dayResults.some(result => result.date === currentDateString && result.status === 2)) {
                setStatus(DAY_RESULT_STATUSES[2]);
            } else {
                setStatus(DAY_RESULT_STATUSES[3]);
            } 
            console.log(habit.habit.dayResults.some(result => result.date === currentDateString))
            getBreakDays();

            
        
    }, [habit, currentDateString]);

    useEffect(() => {
        switch (status) {
            case DAY_RESULT_STATUSES[0]:
                setBackgroundColor('#53e05e');
                setInfoFontColor('#1e1e1e');
                break;
            case DAY_RESULT_STATUSES[1]:
                setBackgroundColor('#cb5050');
                setInfoFontColor('#1e1e1e');
                break;
            case DAY_RESULT_STATUSES[2]:
                setBackgroundColor('#c7d544');
                setInfoFontColor('#1e1e1e');
                break;
            case DAY_RESULT_STATUSES[3]:
                setBackgroundColor('#d9d9d9');
                setInfoFontColor('#828282');
                break;
            case DAY_RESULT_STATUSES[4]:
                setBackgroundColor('transparent');
                setInfoFontColor('#828282');
                break;
            default:
                break;
        }
    }, [status]);

    useEffect(() => {
        if (status !== DAY_RESULT_STATUSES[3]){
            setInfoFontColor('#1e1e1e')
        } else {
            setInfoFontColor('#828282')
        }
    },[])
    
    return {backgroundColor, status, progressToDisplay, quantityToDisplay, breakDays, infoFontColor};
}