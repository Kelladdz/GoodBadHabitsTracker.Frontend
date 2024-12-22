import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { changeName, useFetchHabitQuery } from '../../../store';

import {EDIT_ICON_ALTERNATE_LABEL} from '../../../constants/alternate-labels';

import EditIcon from '../../../assets/svg/edit-icon.svg';

import styles from '../../../styles/CreatorNameInput.module.css';

const CreatorNameInput = () => {
    const dispatch = useDispatch();
    const name = useSelector(state => state.goodHabitCreator.name);
    const [nameEditMode, setNameEditMode] = useState(true);
    const [inputValue, setInputValue] = useState(name);

    const handleClick = () => {
        setNameEditMode(true);
    }

    const handleNameChange = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && ((inputValue.length >= 3 && inputValue.length <= 50) || inputValue.length === 0)) {
            try {
                dispatch(changeName(inputValue));
            } catch (error) {
                throw new Error(error);
            } finally {
                setNameEditMode(false);
            }
        }
    }

    return (
        <div className={styles['creator-name-input']}>
            {nameEditMode 
            ? 
            <input minLength={3} maxLength={50} type="text" placeholder='Habit name...' className={styles.input} value={inputValue} onChange={handleNameChange} onKeyDown={handleKeyDown}/>
            : <>
                {name.length > 2 
                ? <span className={styles.name}>{name}</span> 
                : <span style={{color: '#d6d6d6'}} className={styles.name}>`Habit name...`</span>}
                <button className={styles.btn} onClick={handleClick}>
                    <img className={styles.icon} src={EditIcon} alt={EDIT_ICON_ALTERNATE_LABEL}/>
                </button>
            </>}
        </div>
    );
}

export default CreatorNameInput;