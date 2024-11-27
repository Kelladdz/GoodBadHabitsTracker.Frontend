import React, { useState, useRef, useEffect } from 'react';

import { CARET_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import Caret from '../../../assets/svg/caret-white.svg';

import styles from '../../../styles/SettingsDropdown.module.css';

const SettingsDropdown = ({children, label}) => {
    const [isOpen, setIsOpen] = useState(false);

    const firstDayRef = useRef();

    const handleClick = () => {
        if (!isOpen) {
            setIsOpen(true);
        }
    }

    const handleClickOutsideDropdown = (e) => {
        if (firstDayRef.current && !firstDayRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideDropdown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown);
        }
    })

    return (
        <div ref={firstDayRef} className={styles['settings-dropdown']}>
            <button className={styles.btn} onClick={handleClick}>
                <span className={styles.label}>{label}</span>
                <img className={styles.icon} src={Caret} alt={CARET_ALTERNATE_LABEL} />
            </button>
            {isOpen && <ul className={styles.list}>
                {children}
            </ul>}
        </div>)
}

export default SettingsDropdown;