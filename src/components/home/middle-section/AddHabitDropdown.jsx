import { useState, useContext, useEffect, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import { easeExpIn } from 'd3-ease';

import HabitCreatorContext from '../../../context/habit-creator';
import FilterBarContext from '../../../context/filter-bar';

import { PLUS_SIGN_ALTERNATE_LABEL, CARET_ALTERNATE_LABEL } from '../../../constants/alternate-labels';
import { FILTER_BAR_BUTTON_LABELS } from '../../../constants/button-labels';
import { CREATOR_TYPES } from '../../../constants/creator-types';

import PlusSign from '../../../assets/svg/plus-sign.svg';
import WhiteCaret from '../../../assets/svg/caret-white.svg';

import styles from '../../../styles/AddHabitDropdown.module.css';

const AddHabitDropdown = () => {
    const {isSearchBarOpen} = useContext(FilterBarContext);
    const {toggleCreator} = useContext(HabitCreatorContext);

    const dropdownRef = useRef(null);
    const btnRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const wrappedClass = isSearchBarOpen ? 'wrapped-' : '';
    

    const dropdownTransition = useTransition(isOpen, {
        from: { height: '0rem' },
        enter: { height: `4rem` },
        leave: { height: '0rem' },
        config: { 
            duration: 250,
            easing: easeExpIn},
    });


    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleGoodHabitCreateButtonClick = () => {
        toggleCreator(CREATOR_TYPES.goodHabit);
        setIsOpen(false);
    }

    const handleBadHabitCreateButtonClick = () => {
        toggleCreator(CREATOR_TYPES.limitHabit);
        setIsOpen(false);
    }

    const dropdown = 
    dropdownTransition((style, isOpen) => isOpen && 
        <animated.ul style={style} ref={dropdownRef} className={styles.list}>
            <li className={styles.item} onClick={handleGoodHabitCreateButtonClick}>Develop good habit</li>
            <li className={styles.item} onClick={handleBadHabitCreateButtonClick}>Break bad habit</li>
        </animated.ul>);

    const handleClickDropdown = (e) => {
        if (btnRef.current && !btnRef.current.contains(e.target)
        && (dropdownRef.current && !dropdownRef.current.contains(e.target))) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickDropdown);
        return () => {
            document.removeEventListener('mousedown', handleClickDropdown);
        }
    },[]);

    return(
        <div style={{position: 'relative'}}>  
            <button ref={btnRef} className={styles[`${wrappedClass}add-habit-dropdown`]} onClick={handleClick}>
                <img className={styles['mobile-icon']} src={PlusSign} alt={PLUS_SIGN_ALTERNATE_LABEL}/>
                {!isSearchBarOpen ?
                    <>
                        <img className={styles.icon} src={PlusSign} alt={PLUS_SIGN_ALTERNATE_LABEL}/>
                        <span className={styles[`${wrappedClass}label`]}>{FILTER_BAR_BUTTON_LABELS.addHabit}</span>
                        <img className={styles.icon} src={WhiteCaret} alt={CARET_ALTERNATE_LABEL}/>
                    </> 
                    :
                    <img className={styles.icon} src={PlusSign} alt={PLUS_SIGN_ALTERNATE_LABEL}/>
                }               
            </button>
            {dropdown}
        </div>);
}

export default AddHabitDropdown;