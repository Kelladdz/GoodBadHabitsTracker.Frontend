import { useState, useRef, useEffect, useContext} from 'react';
import { useSelector } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import { easeExpIn } from "d3-ease";

import HabitCreatorContext from '../../../context/habit-creator';
import LeftBarContext from '../../../context/left-bar';

import Caret from '../../../assets/svg/caret.svg';

import { CARET_ALTERNATE_LABEL } from '../../../constants/alternate-labels';
import { HABIT_PROPERTIES } from '../../../constants/habits-properties';
import { CREATOR_TYPES } from '../../../constants/creator-types';

import styles from '../../../styles/CreatorDropdown.module.css';

const CreatorDropdown = ({style, options, property, handleOptionChange, selectedGroup}) => {
    const groupId = useSelector(state => state.goodHabitCreator.groupId);

    const {activeGroup} = useContext(LeftBarContext);
    const {activeCreator, activeEditor} = useContext(HabitCreatorContext);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(selectedGroup?.group.name || options[0]);

    const dropdownRef = useRef();
    const listRef = useRef();


    const listHeight = options.length * 2;
    const transitions = useTransition(isOpen, {
        from: { height: '0rem', },
        enter: { height: `${listHeight}rem`,},
        leave: { height: '0rem',},
        config: { 
            duration: 250,
            easing: easeExpIn},
    });

    const handleDropdownClick = () => {
        if (!isOpen) {
            setIsOpen(true);
        }
    }

    const handleOptionClick = (index) => {
        console.log(options[index]);
        setSelectedOption(options[index]);
        setIsOpen(false);
        handleOptionChange(property, index);
    }

    const handleClickOutsideDropdown = (e) => {
        if (dropdownRef.current && listRef.current 
            && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        if (dropdownRef.current && (activeCreator === CREATOR_TYPES.quitHabit || activeEditor === CREATOR_TYPES.quitHabit) && property !== HABIT_PROPERTIES.group) {
            dropdownRef.current.classList.add(styles.disabled);     
        } else if (dropdownRef.current && activeCreator !== CREATOR_TYPES.quitHabit && activeEditor !== CREATOR_TYPES.quitHabit) {
            dropdownRef.current.classList.remove(styles.disabled);     
        }
    },[activeCreator, activeEditor])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideDropdown);
        console.log(selectedGroup)
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown);
        }
    },[])

    return (
        <div style={style} className={styles.container} ref={dropdownRef}>
            <div  className={styles['creator-dropdown']} onClick={handleDropdownClick}>
                <span className={styles.label}>{selectedOption}</span>
                <img className={styles.icon} src={Caret} alt={CARET_ALTERNATE_LABEL}/>
            </div>
            {transitions((style, isOpen) =>
                isOpen ? (
                    <animated.ul style={style} ref={listRef} className={styles.list}>
                        {options.map((opt, index) => <li key={index} className={styles.option} onClick={() => handleOptionClick(index)}>{opt}</li>)}
                    </animated.ul>) : null)}
        </div>
    )
}

export default CreatorDropdown;