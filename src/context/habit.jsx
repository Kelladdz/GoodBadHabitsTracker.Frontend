import { act, createContext, useContext, useEffect, useState } from 'react';
import { a } from 'react-spring';
import CalendarContext from './calendar';

const HabitContext = createContext();

function HabitProvider({children}) {
    const [activeHabit, setActiveHabit] = useState(null);
    const [completedResultsCount, setCompletedResultsCount] = useState(0);
    const [failedResultsCount, setFailedResultsCount] = useState(0);
    const [skippedResultsCount, setSkippedResultsCount] = useState(0);
    const [totalResultsCount, setTotalResultsCount] = useState(0);
    const [streak, setStreak] = useState(0);
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
        setStreak(count);
    }

    const incrementStreak = () => {
        setStreak(prev => prev + 1);
    }

    const addResultToStatistics = (number) => {

        switch (number) {
            case 0:
                setCompletedResultsCount(prev => prev + 1);
                if (currentDateString === new Date().toISOString().substring(0, 10)){
                    incrementStreak();
                }
                break;
            case 1:
                setFailedResultsCount(prev => prev + 1);
                break;
            case 2:
                setSkippedResultsCount(prev => prev + 1);
                break;
            default:
                break;
        }
        setTotalResultsCount(prev => prev + 1);
    }

    useEffect(() => {
        if (activeHabit) {
            setDayResults(activeHabit.habit.dayResults);
        }
    },[activeHabit]);

    useEffect(() => {
        if (dayResults && dayResults.length > 0) {
            setCompletedResultsCount(dayResults.filter(result => result.status === 0).length );
            setFailedResultsCount(dayResults.filter(result => result.status === 1).length );
            setSkippedResultsCount(dayResults.filter(result => result.status === 2).length );
            setTotalResultsCount(dayResults.filter(result => result.status !== 3 && result.status !== 4).length );
            getStreak();
        }
    },[dayResults]);

    return <HabitContext.Provider value={{
        activeHabit, toggleHabit, 
        completedResultsCount, failedResultsCount,
        skippedResultsCount, totalResultsCount, streak,
        addResultToStatistics, toggleDetails, activeDetails, breakDays}}>
            {children}
		</HabitContext.Provider>;
} 

export { HabitProvider };
export default HabitContext;