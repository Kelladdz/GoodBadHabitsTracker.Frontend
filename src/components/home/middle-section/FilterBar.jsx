import { useRef, useEffect, useState, useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import { easeExpIn } from 'd3-ease';

import LeftBarContext from '../../../context/left-bar';
import CalendarContext from '../../../context/calendar';

import FilterBarDropdown from './FilterBarDropdown';
import SearchBarInput from './SearchBarInput';
import AddHabitDropdown from './AddHabitDropdown';
import Calendar from '../shared/Calendar';
import SortMenu from './SortMenu';

import { FILTER_BAR_BUTTON_LABELS } from '../../../constants/button-labels';
import { CALENDAR_TYPES } from '../../../constants/calendar-types';
import { CALENDAR_ICON_ALTERNATE_LABEL, FILTER_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import CalendarIcon from '../../../assets/svg/calendar-icon.svg';
import FilterIcon from '../../../assets/svg/filter-icon.svg';

import styles from '../../../styles/FilterBar.module.css';
import { useSelector } from 'react-redux';

const FilterBar = () => {
    const {activeGroup} = useContext(LeftBarContext);
    const currentDate = useSelector(state => state.calendar.currentDate);
    const currentDateString = currentDate.toISOString().substring(0, 10);
    const todayString = new Date().toISOString().substring(0, 10);

    const calendarRef = useRef(null);
    const calendarDropdownRef = useRef(null);
    const sortMenuRef = useRef(null);
    const sortMenuDropdownRef = useRef(null);

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
    
    const calendarTransition = useTransition(isCalendarOpen, {
        from: { height: '0rem' },
        enter: { height: `17rem` },
        leave: { height: '0rem' },
        config: { 
            duration: 250,
            easing: easeExpIn},
    });

    const sortTransition = useTransition(isSortMenuOpen, {
        from: { height: '0rem' },
        enter: { height: `6.2rem` },
        leave: { height: '0rem' },
        config: { 
            duration: 250,
            easing: easeExpIn},
    });

    const calendar = 
        calendarTransition((style, isCalendarOpen) => isCalendarOpen && 
        <animated.div style={style} className={styles['animated-box']}>
            <Calendar ref={calendarRef} cellSize='2rem' headerPadding='0' type={CALENDAR_TYPES.filter}/>
        </animated.div>);

    const sortMenu = 
    sortTransition((style, isSortMenuOpen) => isSortMenuOpen && 
        <animated.div style={style} className={styles['animated-box']}>
            <SortMenu ref={sortMenuRef} />
        </animated.div>);
        

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
                    <FilterBarDropdown icon={FilterIcon} alt={FILTER_ICON_ALTERNATE_LABEL} label={currentDateString === todayString ? 'Today' : currentDateString} onClick={showCalendar} content={calendar}/>       
                </div>
                <div ref={sortMenuDropdownRef} className={styles['dropdown-box']}>
                    <FilterBarDropdown icon={CalendarIcon} alt={CALENDAR_ICON_ALTERNATE_LABEL} label={FILTER_BAR_BUTTON_LABELS.sortBy} onClick={showSortMenu} content={sortMenu}/>
                </div>
                <AddHabitDropdown/>
            </div> 
        </div>
        
    );
}

export default FilterBar;