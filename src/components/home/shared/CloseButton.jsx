import React, { useContext } from 'react';

import SettingsContext from '../../../context/settings';

import { CLOSE_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import CloseIcon from '../../../assets/svg/close-icon.svg';

import styles from '../../../styles/CloseButton.module.css';

const CloseButton = () => {
    const {toggleSettings} = useContext(SettingsContext);

    const handleClick = () => {
        toggleSettings(false);
    }
    return (
        <button className={styles['close-btn']} onClick={handleClick}>
            <img src={CloseIcon} alt={CLOSE_ICON_ALTERNATE_LABEL}/>
        </button>
    );
}

export default CloseButton;