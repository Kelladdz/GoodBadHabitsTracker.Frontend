import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';

import { changeFirstDayOfWeek } from '../../../store';

import CloseButton from '../../home/shared/CloseButton';
import ProfileBox from './ProfileBox';
import UserNameInput from './UserNameInput';
import SettingsDropdown from './SettingsDropdown';
import SettingsSection from './SettingsSection';
import SettingsButton from './SettingsButton';

import styles from '../../../styles/Settings.module.css';
import ModalsContext from '../../../context/modals';
import { MODAL_TYPES } from '../../../constants/modal-types';

const Settings = () => {
    const dispatch = useDispatch();
    const settings = useSelector(state => state.settings);
    const {toggleModal} = useContext(ModalsContext)

    const checkedMondayClass = !settings.isSundayFirstDayOfWeek ? 'checked-' : '';
    const checkedSundayClass = settings.isSundayFirstDayOfWeek ? 'checked-' : '';

    const handleSundayAsFirstDayOfWeekSet = (flag) => {
        dispatch(changeFirstDayOfWeek(flag));
    }

    const handleAccountDeleteClick = () => {
        toggleModal(MODAL_TYPES.deleteAccount);
    }

    const handleAllHabitsDeleteClick = () => {
        toggleModal(MODAL_TYPES.deleteAllHabits);
    }

    const handleAllHabitsProgressDeleteClick = () => {
        toggleModal(MODAL_TYPES.deleteAllHabitsProgress);
    }
    
    return (
        <>
            {createPortal(
                <div className={styles.overlay}>
                    <div className={styles.settings}>
                        <CloseButton />
                        <ProfileBox />
                        <UserNameInput />
                        <div className={styles['settings-box']}>
                                <div className={styles['caution-zone']}>
                                    <span className={styles['caution-text']}>CAUTION ZONE</span>
                                    <div className={styles['caution-box']}>
                                        <SettingsSection
                                        title='Delete Account' 
                                        text='All your data will be removed'>
                                            <SettingsButton label='Delete' onClick={handleAccountDeleteClick}/>
                                        </SettingsSection>
                                        <SettingsSection
                                        title='Delete All Data' 
                                        text='Delete all habits and all progress'>
                                            <SettingsButton label='Delete' onClick={handleAllHabitsDeleteClick}/>
                                        </SettingsSection>
                                        <SettingsSection
                                        title='Reset Habit Data' 
                                        text='Delete all progress from habits'>
                                            <SettingsButton label='Delete' onClick={handleAllHabitsProgressDeleteClick}/>
                                        </SettingsSection>
                                    </div>
                                </div>
                                <div className={styles['general-settings']}>
                                    <span className={styles['general-settings-text']}>GENERAL SETTINGS</span>
                                    <div className={styles['general-settings-box']}>
                                        <SettingsSection
                                        title='First Day of the Week' 
                                        text='Choose a day on which a week stars on the app'>
                                            <SettingsDropdown label={settings.isSundayFirstDayOfWeek ? 'Sunday' : 'Monday'}>
                                                <li className={styles[`${checkedMondayClass}dropdown-item`]} onClick={() => handleSundayAsFirstDayOfWeekSet(false)}>
                                                    <span className={styles['dropdown-item-label']}>Monday</span>
                                                </li>
                                                <li className={styles[`${checkedSundayClass}dropdown-item`]} onClick={() => handleSundayAsFirstDayOfWeekSet(true)}>
                                                    <span className={styles['dropdown-item-label']}>Sunday</span>
                                                </li>
                                            </SettingsDropdown>
                                        </SettingsSection>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>,document.querySelector('.modal-container'))
                }</>
)
}

export default Settings;