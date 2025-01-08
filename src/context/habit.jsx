import { act, createContext, useContext, useEffect, useState } from 'react';
import { setTotalResultsCount, setStreak, setCompletedResultsCount, setFailedResultsCount, setSkippedResultsCount, addResult,
    addCompletedResult, addFailedResult, addSkippedResult, addStreak  } from '../store';
import CalendarContext from './calendar';
import { useDispatch } from 'react-redux';

const HabitContext = createContext();

function HabitProvider({children}) {
    const dispatch = useDispatch();

    const [activeHabit, setActiveHabit] = useState(null);
    const [dayResults, setDayResults] = useState([]);
    const [activeDetails, setActiveDetails] = useState(false);
    const [breakDays, setBreakDays] = useState(0);

    const {currentDate} = useContext(CalendarContext);

    const toggleHabit = (habit) => {
        setActiveHabit(habit);
    }

    const toggleDetails = (flag) => {
        setActiveDetails(flag);
    }

    const getStreak = () => {
        let count = 0;
        let results = dayResults.filter(result => result).sort((a, b) => b.date.localeCompare(a.date));
        console.log('results: ', results);
        for (let i = 0; i < results.length; i++) {
            if (results[i].status === 0) {
                count++;
                continue;
            } else if (results[i].status !== 0 ) {
                if (results[i].status === 3 && i === 0) {
                    continue;
                } else {
                    break;
                }
            }
        }
        dispatch(setStreak(count));
    }



    const addResultToStatistics = (number) => {

        switch (number) {
            case 0:
                dispatch(addCompletedResult());
                if (currentDateString === new Date().toISOString().substring(0, 10)){
                    dispatch(addStreak());
                }
                break;
            case 1:
                dispatch(addFailedResult());
                break;
            case 2:
                dispatch(addSkippedResult());
                break;
            default:
                break;
        }
        dispatch(addResult());
        getStreak();
    }

    useEffect(() => {
        if (activeHabit) {
            setDayResults(activeHabit.habit.dayResults);
        }
    },[activeHabit]);

    useEffect(() => {
        if (dayResults && dayResults.length > 0) {
            dispatch(setCompletedResultsCount(dayResults.filter(result => result.status === 0).length ));
            dispatch(setFailedResultsCount(dayResults.filter(result => result.status === 1).length ));
            dispatch(setSkippedResultsCount(dayResults.filter(result => result.status === 2).length ));
            dispatch(setTotalResultsCount(dayResults.filter(result => result.status !== 3 && result.status !== 4).length ));
            getStreak();
        }
    },[dayResults]);

    return <HabitContext.Provider value={{
        activeHabit, toggleHabit,
        addResultToStatistics, toggleDetails, activeDetails, breakDays}}>
            {children}
		</HabitContext.Provider>;
} 

export { HabitProvider };
export default HabitContext;