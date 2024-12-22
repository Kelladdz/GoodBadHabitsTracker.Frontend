import { useContext, useEffect, useState } from 'react';

import { useSearchHabitsQuery, useFetchGroupQuery } from '../store';

import LeftBarContext from '../context/left-bar';
import FilterBarContext from '../context/filter-bar';

import { ORDER_OPTIONS } from '../constants/order-options';
import { useSelector } from 'react-redux';

export function useFilter() {
    const {searchString, orderOption} = useContext(FilterBarContext);

    const [goodHabits, setGoodHabits] = useState();
    const [limitHabits, setLimitHabits] = useState();
    const [quitHabits, setQuitHabits] = useState();

    const sortHabitsByType = (habits) => {
        console.log(habits);
        setGoodHabits(habits.filter(habit => habit.habit.habitType === 0));
        setLimitHabits(habits.filter(habit => habit.habit.habitType === 1));
        setQuitHabits(habits.filter(habit => habit.habit.habitType === 2));
    }

    useEffect(() => {
        console.log('orderOption', orderOption);
        switch (orderOption) {
            case ORDER_OPTIONS[0]:
                break;
            case ORDER_OPTIONS[1]:
                setGoodHabits([...goodHabits].sort((a, b) => a.habit.name.localeCompare(b.habit.name)));
                setLimitHabits([...limitHabits].sort((a, b) => a.habit.name.localeCompare(b.habit.name)));
                setQuitHabits([...quitHabits].sort((a, b) => a.habit.name.localeCompare(b.habit.name)));
                break;
            case ORDER_OPTIONS[2]:
                setGoodHabits([...goodHabits].sort((a, b) => b.habit.name.localeCompare(a.habit.name)));
                setLimitHabits([...limitHabits].sort((a, b) => b.habit.name.localeCompare(a.habit.name)));
                setQuitHabits([...quitHabits].sort((a, b) => b.habit.name.localeCompare(a.habit.name)));
                break;
            case ORDER_OPTIONS[3]:
                break;
            default:
                break;
        }
    }, [orderOption])

    return {goodHabits, limitHabits, quitHabits, searchString, sortHabitsByType};
}

export default useFilter;