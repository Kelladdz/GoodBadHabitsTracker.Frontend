import React, { useState } from 'react';

import { EDIT_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import EditIcon from '../../../assets/svg/edit-icon.svg';

import styles from '../../../styles/UserNameInput.module.css';
import { useDispatch, useSelector } from 'react-redux';
const UserNameInput = () => {
    const dispatch = useDispatch()
    const userName = useSelector(state => state.settings.name);
    const [editMode, setEditMode] = useState(false);
    const [nameInput, setNameInput] = useState(userName)
    const handleClick = () => {
        setEditMode(true);
    }

    const handleNameChange = (e) => {
        e.preventDefault();
        setNameInput(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && userName.length >= 3 && userName.length <= 50) {
            console.log('Name changed to: ', userName);
            dispatch(changeName(nameInput));
        }
    }
    return (
        <div className={styles['user-name-input']}>
            {editMode ? 
                <input minLength={3} maxLength={50} autoFocus type="text" placeholder='Your name...' className={styles.input} value={nameInput} onChange={handleNameChange} onKeyDown={handleKeyDown}/>
                :   
                <>
                {userName.length > 3 ? 
                    <span className={styles.name}>Hello, {userName}</span> 
                    : 
                    <span style={{color: '#d6d6d6'}} className={styles.name} onClick={handleClick}>Your name...</span>
                }
                <button className={styles.btn} onClick={handleClick}>
                    <img className={styles.icon} src={EditIcon} alt={EDIT_ICON_ALTERNATE_LABEL}/>
                </button>
            </>}
        </div>)
}

export default UserNameInput;