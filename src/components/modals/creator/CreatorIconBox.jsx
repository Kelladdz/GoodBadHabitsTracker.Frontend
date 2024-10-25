import {useEffect, useRef, useState} from 'react';
import {useTransition, animated} from 'react-spring';
import {easeExpIn} from 'd3-ease';
import EditIcon from '../../../assets/svg/edit-icon.svg';
import QuestionMark from '../../../assets/habit-icons/question-mark.svg';

import {HABIT_ICON_ALTERNATE_LABEL, EDIT_ICON_ALTERNATE_LABEL} from '../../../constants/alternate-labels';

import styles from '../../../styles/CreatorIconBox.module.css';
import CreatorIconsGrid from './CreatorIconsGrid';
import { useSelector, useDispatch } from 'react-redux';
import { HABIT_ICONS_URLS } from '../../../constants/habit-icons';
import { changeIcon } from '../../../store';

const CreatorIconBox = () => {
    const dispatch = useDispatch();
    const icon = useSelector(state => state.goodHabitCreator.iconIndex);
    const [editIconMode, setEditIconMode] = useState(false);

    const ref = useRef();

    const gridTransition = useTransition(editIconMode, {
        from: { width: '0rem' },
        enter: { width: '21rem' },
        leave: { width: '0rem' },
        config: { 
            duration: 250,
            easing: easeExpIn},
    });

    const handleClick = () => {
        setEditIconMode(true);
    }

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setEditIconMode(false);
        }
    }

    

    const handleIconClick = (index) => {
        dispatch(changeIcon(index));
        setEditIconMode(false);
    }

    useEffect(() => {
        if (editIconMode) {
            
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    })
    return (
        <div className={styles['creator-icon-box']}>
            <img className={styles.icon} src={HABIT_ICONS_URLS[icon]} alt={HABIT_ICON_ALTERNATE_LABEL}/>
            <button type='button' className={styles.btn} onClick={handleClick}>
                <img className={styles['edit-icon']} src={EditIcon} alt={EDIT_ICON_ALTERNATE_LABEL}/>
            </button>
            {gridTransition((style, editIconMode) => editIconMode && 
            <animated.div ref={ref} className={styles['grid-box']} style={style}>
                <CreatorIconsGrid handleIconClick={handleIconClick} />
            </animated.div>)}
        </div>
    )
}

export default CreatorIconBox;