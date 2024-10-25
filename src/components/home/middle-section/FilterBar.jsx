import { useRef, useEffect, useState, useContext } from 'react';

import LeftBarContext from '../../../context/left-bar';

import FilterBarDropdown from './FilterBarDropdown';
import SearchBarInput from './SearchBarInput';
import AddHabitDropdown from './AddHabitDropdown';
import Calendar from '../shared/Calendar';

import { FILTER_BAR_BUTTON_LABELS } from '../../../constants/button-labels';

import styles from '../../../styles/FilterBar.module.css';
import SortMenu from './SortMenu';
import { CALENDAR_TYPES } from '../../../constants/calendar-types';

const FilterBar = () => {
    const {activeGroup} = useContext(LeftBarContext);

    const calendarRef = useRef(null);
    const calendarDropdownRef = useRef(null);

    const sortMenuRef = useRef(null);
    const sortMenuDropdownRef = useRef(null);

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

    const showCalendar = () => {
        if (!isCalendarOpen) {
            setIsCalendarOpen(true);
        }  
    }

    const showSortMenu = () => {
        if (!isSortMenuOpen) {
            setIsSortMenuOpen(true);
        } 
    }

    const handleClickOutsideCalendarDropdown = (e) => {
        if (calendarRef.current && !calendarRef.current.contains(e.target)
        && (calendarDropdownRef.current && !calendarDropdownRef.current.contains(e.target))) {
            setIsCalendarOpen(false);
        }
    }

    const handleClickOutsideSortMenuDropdown = (e) => {
        if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)
        && (sortMenuDropdownRef.current && !sortMenuDropdownRef.current.contains(e.target))) {
            setIsSortMenuOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideCalendarDropdown);
        document.addEventListener('mousedown', handleClickOutsideSortMenuDropdown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideCalendarDropdown);
            document.removeEventListener('mousedown', handleClickOutsideSortMenuDropdown);
        }
    },[]);
    

    return (
        <div className={styles['filter-bar']}>
            <div className={styles['group-name-box']}>
                <span className={styles['group-name']}>{activeGroup.name ? activeGroup.name : activeGroup}</span>
            </div>
            <div className={styles['r-side']}>
                <SearchBarInput/>
                <div ref={calendarDropdownRef} className={styles['dropdown-box']}>
                    <FilterBarDropdown label='Today' onClick={showCalendar} content={isCalendarOpen ? <Calendar ref={calendarRef} cellSize='2rem' headerPadding='0' type={CALENDAR_TYPES.filter}/>  : null}/>
                </div>
                <div ref={sortMenuDropdownRef} className={styles['dropdown-box']}>
                    <FilterBarDropdown label={FILTER_BAR_BUTTON_LABELS.sortBy} onClick={showSortMenu} content={isSortMenuOpen ? <SortMenu ref={sortMenuRef} /> : null}/>
                </div>
                <AddHabitDropdown/>
            </div> 
        </div>
    );
}

export default FilterBar;