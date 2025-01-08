import { useContext, useEffect, useState } from "react";
import { useFetchHabitQuery } from './../store'
import HabitContext from "../context/habit";

export function useChart() {
    const {activeHabit} = useContext(HabitContext);
    const {data, error, isLoading} = useFetchHabitQuery(activeHabit.habit.id, {skip: !activeHabit})

    const getStreaks = (month) => {
        if (data && data.habit) {
            console.log(data.habit);
            const currentMonthResults = data.habit.dayResults.filter(result => new Date(result.date).getMonth() === month).sort((a, b) => b.date.localeCompare(a.date));
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
        if (data && data.habit) {
            return data.habit.dayResults.filter(result => new Date(result.date).getMonth() === month && result.status === 0).length;
        }
    }

    const getFails = (month) => {
        if (data && data.habit) {
            return data.habit.dayResults.filter(result => new Date(result.date).getMonth() === month && result.status === 1).length;
        }
    }



    return {getStreaks, getCompletes, getFails};
}