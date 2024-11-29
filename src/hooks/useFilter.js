import { useContext, useEffect, useState } from 'react';

import { useFetchHabitsQuery } from '../store';

import CalendarContext from '../context/calendar';
import FilterBarContext from '../context/filter-bar';

import { ORDER_OPTIONS } from '../constants/order-options';
import { useSelector } from 'react-redux';

export function useFilter() {
    const {currentDate} = useContext(CalendarContext);
    const {searchString, orderOption} = useContext(FilterBarContext);
    const accessToken = useSelector(state => state.auth.accessToken);

    const [habits, setHabits] = useState([]);
    const [filteredGoodHabits, setFilteredGoodHabits] = useState([]);
    const [filteredLimitHabits, setFilteredLimitHabits] = useState([]);
    const [filteredQuitHabits, setFilteredQuitHabits] = useState([]);

    const {data, error, isLoading} = useFetchHabitsQuery(null, {skip: !accessToken}) || [];

    const filterByDate = (habits, currentDate) => {
        let filteredHabits = [];
        habits.forEach(habit => {
            const startDate = new Date(habit.startDate);
            const repeatMode = habit.repeatMode;
            const repeatInterval = habit.repeatInterval;
            const diffTime = Math.abs(currentDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            switch (repeatMode) {
                case 0:
                    break;
                case 1:
                    if (habit.repeatDaysOfWeek.includes(currentDate.getDay())) {
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
            setHabits(data.map(item => item.entity));
        }
    }, [data, isLoading]);

    useEffect(() => {
        habits.forEach(habit => console.log(habit.name, currentDate, habit.startDate, new Date(habit.startDate) - currentDate));
        
        let goodHabits = searchString.length > 2 
            ? habits.filter(habit => habit.habitType === 0 && habit.name.toLowerCase().includes(searchString.toLowerCase()) && new Date(habit.startDate) <= currentDate) 
            : habits.filter(habit => habit.habitType === 0 && new Date(habit.startDate) <= currentDate);
        goodHabits = filterByDate(goodHabits, currentDate);
        setFilteredGoodHabits(goodHabits);
        
        setFilteredLimitHabits(searchString.length > 2 
            ? habits.filter(habit => 
                habit.habitType === 1 && habit.name.toLowerCase().includes(searchString.toLowerCase()) && new Date(habit.startDate) <= currentDate) 
            : habits.filter(habit => habit.habitType === 1 && new Date(habit.startDate) <= currentDate));
        setFilteredQuitHabits(searchString.length > 2 
            ? 
                habits.filter(habit => habit.habitType === 2 && habit.name.toLowerCase().includes(searchString.toLowerCase()) && new Date(habit.startDate) <= currentDate) 
            : habits.filter(habit => habit.habitType === 2 && new Date(habit.startDate) <= currentDate));
    },[habits, currentDate, searchString])

    useEffect(() => {
        console.log('orderOption', orderOption);
        switch (orderOption) {
            case ORDER_OPTIONS[0]:
                break;
            case ORDER_OPTIONS[1]:
                setFilteredGoodHabits([...filteredGoodHabits].sort((a, b) => a.name.localeCompare(b.name)));
                setFilteredLimitHabits([...filteredLimitHabits].sort((a, b) => a.name.localeCompare(b.name)));
                setFilteredQuitHabits([...filteredQuitHabits].sort((a, b) => a.name.localeCompare(b.name)));
                break;
            case ORDER_OPTIONS[2]:
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