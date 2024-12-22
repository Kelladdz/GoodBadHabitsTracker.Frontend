import { useContext, useEffect, useState } from "react";

import HabitContext from "../context/habit";

export function useChart() {
    const {activeHabit} = useContext(HabitContext);

    const [dayResults, setDayResults] = useState();

    const getStreaks = (month) => {
        if (activeHabit.habit) {
            console.log(activeHabit.habit);
            const currentMonthResults = activeHabit.habit.dayResults.filter(result => new Date(result.date).getMonth() === month).sort((a, b) => b.date.localeCompare(a.date));
            console.log(currentMonthResults);
            let streak = 0;
            let newStreak = 0;
            for (let i = 0; i < currentMonthResults.length; i++) {
                if (currentMonthResults[i].status === 0) {
                    newStreak++;
                } else {
                    if (newStreak > streak) {
                        streak = newStreak;
                    }
                    newStreak = 0;
                }
            }
            console.log(streak);
            return streak;
            }
            else return 0;
    }

    const getCompletes = (month) => {
        if (activeHabit.habit) {
            return activeHabit.habit.dayResults.filter(result => new Date(result.date).getMonth() === month && result.status === 0).length;
        }
    }

    const getFails = (month) => {
        if (activeHabit.habit) {
            return activeHabit.habit.dayResults.filter(result => new Date(result.date).getMonth() === month && result.status === 1).length;
        }
    }

    useEffect(() => {
        if (activeHabit.habit) {
            const results = activeHabit.habit.dayResults;
            setDayResults(results);
        }
    }, [activeHabit]);



    return {getStreaks, getCompletes, getFails};
}