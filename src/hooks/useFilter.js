import { useContext, useEffect, useState } from 'react';

import { useSearchHabitsQuery, useFetchGroupQuery } from '../store';

import LeftBarContext from '../context/left-bar';
import FilterBarContext from '../context/filter-bar';

import { ORDER_OPTIONS } from '../constants/order-options';
import { useSelector } from 'react-redux';

export function useFilter() {
    const currentDate = useSelector(state => state.calendar.currentDate);
    const {activeGroup} = useContext(LeftBarContext);
    const {searchString, orderOption} = useContext(FilterBarContext);
    const accessToken = JSON.parse(localStorage.getItem('profile'))?.accessToken;

    const [habits, setHabits] = useState([]);
    const [filteredGoodHabits, setFilteredGoodHabits] = useState([]);
    const [filteredLimitHabits, setFilteredLimitHabits] = useState([]);
    const [filteredQuitHabits, setFilteredQuitHabits] = useState([]);

    const {data, error, isLoading} = useSearchHabitsQuery({term: searchString, date: currentDate.toISOString().substring(0, 10)}, {skip: !accessToken}) || [];

    const filterByDate = (habits, currentDate) => {
        let filteredHabits = [];
        habits.forEach(habit => {
            const startDate = new Date(habit.habit.startDate);
            const repeatMode = habit.habit.repeatMode;
            const repeatInterval = habit.habit.repeatInterval;
            const diffTime = Math.abs(currentDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            switch (repeatMode) {
                case 0:
                    break;
                case 1:
                    if (habit.habit.repeatDaysOfWeek.includes(currentDate.getDay())) {
                        filteredHabits.push(habit);
                    }
                    break;
                case 2:
                    if (habit.repeatDaysOfMonth.includes(currentDate.getDate())) {
                        filteredHabits.push(habit);
                    }
                    break;
                case 3:
                    if (diffDays % repeatInterval === 0) {
                        filteredHabits.push(habit);
                    }
                    break;
                default:
                    break;
            }
        });
        return filteredHabits;
    }

    useEffect(() => {
        if (data && !isLoading) {
            setHabits(data.map(item => item));
        }
    }, [data, isLoading]);

    useEffect(() => {
        
        
        let goodHabits = searchString.length > 2 
            ? habits.filter(habit => habit.habit.habitType === 0 && habit.habit.name.toLowerCase().includes(searchString.toLowerCase()) && new Date(habit.habit.startDate) <= currentDate) 
            : habits.filter(habit => habit.habit.habitType === 0 && new Date(habit.habit.startDate) <= currentDate);
        goodHabits = filterByDate(goodHabits, currentDate);
        setFilteredGoodHabits(goodHabits);
        
        setFilteredLimitHabits(searchString.length > 2 
            ? habits.filter(habit => 
                habit.habit.habitType === 1 && habit.habit.name.toLowerCase().includes(searchString.toLowerCase()) && new Date(habit.habit.startDate) <= currentDate) 
            : habits.filter(habit => habit.habit.habitType === 1 && new Date(habit.habit.startDate) <= currentDate));
        setFilteredQuitHabits(searchString.length > 2 
            ? 
                habits.filter(habit => habit.habit.habitType === 2 && habit.habit.name.toLowerCase().includes(searchString.toLowerCase()) && new Date(habit.habit.startDate) <= currentDate) 
            : habits.filter(habit => habit.habit.habitType === 2 && new Date(habit.habit.startDate) <= currentDate));
    },[habits, currentDate, searchString])

    useEffect(() => {
        console.log('orderOption', orderOption);
        switch (orderOption) {
            case ORDER_OPTIONS[0]:
                break;
            case ORDER_OPTIONS[1]:
                setFilteredGoodHabits([...filteredGoodHabits].sort((a, b) => a.habit.name.localeCompare(b.habit.name)));
                setFilteredLimitHabits([...filteredLimitHabits].sort((a, b) => a.habit.name.localeCompare(b.habit.name)));
                setFilteredQuitHabits([...filteredQuitHabits].sort((a, b) => a.habit.name.localeCompare(b.habit.name)));
                break;
            case ORDER_OPTIONS[2]:
                setFilteredGoodHabits([...filteredGoodHabits].sort((a, b) => b.habit.name.localeCompare(a.habit.name)));
                setFilteredLimitHabits([...filteredLimitHabits].sort((a, b) => b.habit.name.localeCompare(a.habit.name)));
                setFilteredQuitHabits([...filteredQuitHabits].sort((a, b) => b.habit.name.localeCompare(a.habit.name)));
                break;
            case ORDER_OPTIONS[3]:
                break;
            default:
                break;
        }
    }, [orderOption])

    return {habits, filteredGoodHabits, filteredLimitHabits, filteredQuitHabits, isLoading, searchString};
}

export default useFilter;