import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import { easeExpIn } from "d3-ease";
import { debounce } from 'lodash';

import { changeRepeatMode, removeRepeatDayOfWeek, addRepeatDayOfMonth, addRepeatDayOfWeek, clearRepeatDaysOfWeek, clearRepeatDaysOfMonth, changeRepeatInterval, removeRepeatDayOfMonth } from '../../../store/slices/goodHabitCreatorSlice';

import { useOrderedNumbersShortened } from '../../../hooks/useOrderedNumbersShortened';

import Caret from '../../../assets/svg/caret.svg';
import CheckIcon from '../../../assets/svg/check-icon.svg';

import { CARET_ALTERNATE_LABEL, CHECK_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';
import { HABIT_REPEAT_MODES } from '../../../constants/habits-properties';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_SHORT } from '../../../constants/days-of-week';
import { ORDERED_DAYS_OF_MONTH_SHORT } from '../../../constants/days-of-month';

import styles from '../../../styles/CreatorRepeatDropdown.module.css';

const CreatorRepeatDropdown = () => {
    const dispatch = useDispatch();
    const repeatMode = useSelector(state => state.goodHabitCreator.repeatMode);
    const repeatDaysOfWeek = useSelector(state => state.goodHabitCreator.repeatDaysOfWeek);
    const repeatDaysOfMonth = useSelector(state => state.goodHabitCreator.repeatDaysOfMonth);
    const repeatInterval = useSelector(state => state.goodHabitCreator.repeatInterval);

    const {orderedNumbersShortened} = useOrderedNumbersShortened();

    const [isOpen, setIsOpen] = useState(false);
    const [isNestedOpen, setIsNestedOpen] = useState(false);
    const [hoveredMode, setHoveredMode] = useState();
    const [selectedOptions, setSelectedOptions] = useState(['Daily']);

    const dropdownRef = useRef();
    const listRef = useRef();
    const nestedListRef = useRef();
    const nestedGridRef = useRef();

    const nestedOptions = () => {
        switch (hoveredMode) {
            case HABIT_REPEAT_MODES[0]:
                
                return (
                    nestedListTransition((style, isNestedOpen) =>
                        isNestedOpen ? (
                            <animated.ul style={style} ref={nestedListRef} className={styles['nested-list']} onMouseEnter={() => handleMouseEnterInToNestedDropdown(HABIT_REPEAT_MODES[0])} onMouseLeave={handleMouseLeaveOutsideNestedDropdown}>
                                {DAYS_OF_WEEK.map((day, index) => {
                                const includedDayClass = repeatDaysOfWeek.includes(index) ? 'included-' : '';
                                return <li key={index} className={styles['nested-list-option']} onClick={() => handleDayOfWeekClick(index)}>
                                    {day}
                                    <img className={styles[`${includedDayClass}check-icon`]} src={CheckIcon} alt={CHECK_ICON_ALTERNATE_LABEL}/>
                                </li>})}
                            </animated.ul>) : null)
                )
            case HABIT_REPEAT_MODES[1]:
                const numbers = Array.from({ length: 31 }, (_, i) => i + 1);
                return (
                    nestedGridTransition((style, isNestedOpen) =>
                        isNestedOpen ? (
                            <animated.div style={style} ref={nestedGridRef} className={styles['nested-grid']} onMouseLeave={handleMouseLeaveOutsideNestedDropdown}>
                                {numbers.map(number => {
                                const includedDayClass = repeatDaysOfMonth.includes(number) ? 'included-' : '';
                                return <div key={number} className={styles[`${includedDayClass}day`]} onClick={() => handleDayOfMonthClick(number)}>{number}</div>})}
                            </animated.div>) : null)
                )
            case HABIT_REPEAT_MODES[2]:
                const intervals = Array.from({ length: 6 }, (_, i) => i + 2);
                return (
                    nestedIntervalsListTransition((style, isNestedOpen) =>
                        isNestedOpen ? (
                            <animated.ul style={style} ref={nestedListRef} className={styles['nested-intervals']} onMouseLeave={handleMouseLeaveOutsideNestedDropdown}>
                                {intervals.map((interval, index) => {
                                    const includedDayClass = repeatInterval === interval ? 'included-' : '';
                                    return (<li key={index} className={styles['nested-list-option']} onClick={() => handleIntervalClick(interval)}>
                                        Every {interval} days
                                        <img className={styles[`${includedDayClass}check-icon`]} src={CheckIcon} alt={CHECK_ICON_ALTERNATE_LABEL}/>
                                    </li>)})}
                            </animated.ul>) : null)
                )
            default:
                return [];
        }
    }



    const transition = useTransition(isOpen, {
        from: { height: '0rem' },
        enter: { height: '6rem' },
        leave: { height: '0rem' },
        config: { 
            duration: 250,
            easing: easeExpIn},
    });

    const nestedListTransition = useTransition(isNestedOpen, {
        from: { width: '0rem' },
        enter: { width: '7rem' },
        leave: { width: '0rem' },
        config: { 
            duration: isNestedOpen ? 100 : 250,
            easing: easeExpIn},
    });

    const nestedGridTransition = useTransition(isNestedOpen, {
        from: { width: '0rem' },
        enter: { width: '14rem' },
        leave: { width: '0rem' },
        config: { 
            duration: isNestedOpen ? 100 : 250,
            easing: easeExpIn},
    });

    const nestedIntervalsListTransition = useTransition(isNestedOpen, {
        from: { width: '0rem' },
        enter: { width: '8rem' },
        leave: { width: '0rem' },
        config: { 
            duration: isNestedOpen ? 100 : 250,
            easing: easeExpIn},
    });

    const handleDropdownClick = () => {
        console.log('Clicked');
        setIsOpen(!isOpen);
        
    }

    const handleItemClick = (opt) => {
        if (!isNestedOpen && !hoveredMode) {
            handleOptionHover(opt);
        }
    }

    const handleOptionHover = opt => {
            console.log('debounce', opt);
            if (!isNestedOpen && !hoveredMode) {
                setIsNestedOpen(true)
                setHoveredMode(opt);
            }
            else if (isNestedOpen && hoveredMode && hoveredMode !== opt) {
                setIsNestedOpen(false);
                    setTimeout(() => {
                        setIsNestedOpen(true);
                        setHoveredMode(opt);
                    }, 100);
                
            }
            else if (!isOpen) {
                setIsNestedOpen(false)
                setHoveredMode(null);
            }
    }
    
    const debouncedHandleOptionHover = useCallback(
        debounce(opt => handleOptionHover(opt), 250),[handleOptionHover]
    )
    
    const handleDayOfWeekClick = (index) => {
        dispatch(clearRepeatDaysOfMonth());
        dispatch(changeRepeatInterval(null));
        if (repeatMode !== 1) {
            dispatch(changeRepeatMode(1))
        }  
        if (repeatDaysOfWeek.includes(index) && repeatDaysOfWeek.length !== 1) {
            dispatch(removeRepeatDayOfWeek(index))
        } else if (!repeatDaysOfWeek.includes(index)) {
            dispatch(addRepeatDayOfWeek(index))
        }
    }

    const handleDayOfMonthClick = (number) => {
        dispatch(clearRepeatDaysOfWeek());
        dispatch(changeRepeatInterval(null));
        if (repeatMode !== 2) {
            dispatch(changeRepeatMode(2))
        }
        if (repeatDaysOfMonth.includes(number) && repeatDaysOfMonth.length !== 1) {
            dispatch(removeRepeatDayOfMonth(number))
        } else if (!repeatDaysOfWeek.includes(number)) {
            dispatch(addRepeatDayOfMonth(number))
        }
    }

    const handleIntervalClick = (interval) => {
        dispatch(clearRepeatDaysOfWeek());
        dispatch(clearRepeatDaysOfMonth());
        if (repeatMode !== 3) {
            dispatch(changeRepeatMode(3))
        }
        if (repeatInterval !== interval) {
            dispatch(changeRepeatInterval(interval))
        }
    }

    const handleClickOutsideDropdown = (e) => {
        if (dropdownRef.current && listRef.current 
            && !dropdownRef.current.contains(e.target) && !listRef.current.contains(e.target) ) {
                console.log(1)
            if ((nestedListRef.current && !nestedListRef.current.contains(e.target))
                 || nestedGridRef.current && !nestedGridRef.current.contains(e.target)) {
                    console.log(2)
                setIsNestedOpen(false);
                setTimeout(() => {
                    setHoveredMode(null);
                    setIsOpen(false);
                }, 250);
            } else {
                console.log(3)
                setIsOpen(false);
            }
        
        }
    }

    const handleMouseEnterInToNestedDropdown = (opt) => {
        if (dropdownRef.current && listRef.current) {
            setTimeout(() => {
                setHoveredMode(opt);
            }, 251);
        }
        
    }

    // const handleMouseLeaveOutsideDropdown = (e) => {
    //     if (dropdownRef.current && listRef.current) {
    //             setIsNestedOpen(false);
    //             setTimeout(() => {
    //                 setHoveredMode(null);
    //             }, 250);
            
    //     }
    //     console.log('Mouse leave outside dropdown');
    // }

    const handleMouseLeaveOutsideNestedDropdown = (e) => {
        if (nestedListRef.current || nestedGridRef.current) {
                setIsNestedOpen(false);
                setTimeout(() => {
                    setHoveredMode(null);
                }, 250);
            
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideDropdown);    
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown);
        }
    },[])

    useEffect(() => {
        if (repeatDaysOfWeek.length === 7) {
                setSelectedOptions('Daily');
        } else if (repeatDaysOfWeek.length > 0 && repeatDaysOfWeek.length < 7) {
                setSelectedOptions(DAYS_OF_WEEK_SHORT.filter((day, index) => repeatDaysOfWeek.includes(index)).join(', '));
        } else if (repeatDaysOfMonth.length > 0) {
                setSelectedOptions(ORDERED_DAYS_OF_MONTH_SHORT.filter((day, index) => repeatDaysOfMonth.includes(index + 1)).join(', '));
        } else if (repeatInterval) {
                setSelectedOptions(`Every ${repeatInterval} days`);
        }
    }, [repeatDaysOfWeek, orderedNumbersShortened])

    useEffect(() => {
        if (!isOpen) {
            setIsNestedOpen(false);
            setTimeout(() => {
                setHoveredMode(null);
            }, 250);
        }
    }, [isOpen])


    return (
        <div style={{position: 'relative', width: '100%'}}>
            <div ref={dropdownRef} className={styles['creator-repeat-dropdown']} onClick={handleDropdownClick}>
                <span className={styles.label}>{selectedOptions}</span>
                <img className={styles.icon} src={Caret} alt={CARET_ALTERNATE_LABEL}/>
            </div>
            {transition((style, isOpen) =>
                isOpen ? (
                    <div ref={listRef} className={styles['list-box']}>

                        <animated.ul style={style} className={styles.list}>
                            {HABIT_REPEAT_MODES.map((opt, index) => (
                                <li key={index} className={styles.option} onClick={() => handleItemClick(opt)} onMouseEnter={() => debouncedHandleOptionHover(opt)}>
                                    <span className={styles['option-label']}>{opt}</span>
                                </li>))}
                                
                        </animated.ul>
                        {nestedOptions()}
                    </div>) : null)}
            
        </div>
    );
}

export default CreatorRepeatDropdown;