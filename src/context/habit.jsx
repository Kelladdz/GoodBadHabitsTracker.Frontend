import { createContext, useEffect, useState } from 'react';

const HabitContext = createContext();

function HabitProvider({children}) {
    const [activeHabit, setActiveHabit] = useState(null);
    
    const [completedResultsCount, setCompletedResultsCount] = useState(0);
    const [failedResultsCount, setFailedResultsCount] = useState(0);
    const [skippedResultsCount, setSkippedResultsCount] = useState(0);
    const [totalResultsCount, setTotalResultsCount] = useState(0);
    const [streak, setStreak] = useState(0);

    const dayResults = activeHabit ? activeHabit.dayResults : [];

    const toggleHabit = (habit) => {
        setActiveHabit(habit);
    }

    const getStreak = () => {
        let streak = 0;
        let results = dayResults.filter(result => result).sort((a, b) => b.date.localeCompare(a.date));
        for (let i = 0; i < results.length; i++) {
            if (results[i].status === 0) {
                streak++;
            } else if (results[i].date === new Date().toISOString().substring(0, 10)) {
                continue;
            } else {
                break;
            }
        }
        setStreak(streak);
    }

    const addResultToStatistics = (number) => {
        switch (number) {
            case 0:
                setCompletedResultsCount(prev => prev + 1);
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
        getStreak();
    }

    useEffect(() => {
        if (dayResults) {
            console.log('dayResults', dayResults);
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
        addResultToStatistics}}>
            {children}
		</HabitContext.Provider>;
} 

export { HabitProvider };
export default HabitContext;