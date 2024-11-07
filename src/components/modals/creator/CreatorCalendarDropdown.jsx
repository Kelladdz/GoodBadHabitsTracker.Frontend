import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { animated, useTransition } from "react-spring";
import { easeExpIn } from "d3-ease";

import Calendar from '../../home/shared/Calendar';

import Caret from "../../../assets/svg/caret.svg";

import { CALENDAR_TYPES } from "../../../constants/calendar-types";
import { CARET_ALTERNATE_LABEL } from "../../../constants/alternate-labels";

import styles from '../../../styles/CreatorCalendarDropdown.module.css';

const CreatorCalendarDropdown = () => {
    const startDate = useSelector(state => state.goodHabitCreator.startDate);

    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef();
    const calendarRef = useRef();

    const transition = useTransition(isOpen, {
        from: { height: '0rem' },
        enter: { height: `17rem` },
        leave: { height: '0rem' },
        config: { 
            duration: 250,
            easing: easeExpIn},
    });

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    }

    const handleClickOutsideDropdown = (e) => {
        if (dropdownRef.current && calendarRef.current 
            && !calendarRef.current.contains(e.target) && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    }

    const handleMouseLeaveOutsideDropdown = (e) => {
        if (dropdownRef.current && calendarRef.current) {
            setIsOpen(false);
        }
        console.log('Mouse leave outside dropdown');
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideDropdown);    
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown);
        }
    },[])

    return (
        <div style={{position: 'relative', width: '100%'}}>
            <div ref={dropdownRef} className={styles['creator-calendar-dropdown']} onClick={handleDropdownClick}>
                <span className={styles.label}>{startDate}</span>
                <img className={styles.icon} src={Caret} alt={CARET_ALTERNATE_LABEL}/>
            </div>
            {transition((style, isOpen) =>
                isOpen ? (
                    <animated.div ref={calendarRef} style={style} className={styles['calendar-box']} onMouseLeave={handleMouseLeaveOutsideDropdown}>
                        <Calendar cellSize='2rem' headerPadding='0' type={CALENDAR_TYPES.form}/>
                    </animated.div>) : null)}
        </div>
    );
}

export default CreatorCalendarDropdown;