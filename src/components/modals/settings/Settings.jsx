import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';

import { changeFirstDayOfWeek, changeLanguage } from '../../../store';

import CloseButton from '../../home/shared/CloseButton';
import ProfileBox from './ProfileBox';
import UserNameInput from './UserNameInput';
import SettingsDropdown from './SettingsDropdown';
import SettingsSection from './SettingsSection';
import SettingsButton from './SettingsButton';

import styles from '../../../styles/Settings.module.css';

const Settings = () => {
    const dispatch = useDispatch();
    const settings = useSelector(state => state.settings);

    const handleSundayAsFirstDayOfWeekSet = (flag) => {
        dispatch(changeFirstDayOfWeek(flag));
    }

    const handleLanguageChange = (language) => {
        dispatch(changeLanguage(language));
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
                                            <SettingsButton label='Delete' />
                                        </SettingsSection>
                                        <SettingsSection
                                        title='Delete All Data' 
                                        text='Delete all habits and all progress'>
                                            <SettingsButton label='Delete' />
                                        </SettingsSection>
                                        <SettingsSection
                                        title='Reset Habit Data' 
                                        text='Delete all progress from habits'>
                                            <SettingsButton label='Delete' />
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
                                                <li className={styles['dropdown-item']} onClick={() => handleSundayAsFirstDayOfWeekSet(false)}>
                                                    <span className={styles['dropdown-item-label']}>Monday</span>
                                                </li>
                                                <li className={styles['dropdown-item']} onClick={() => handleSundayAsFirstDayOfWeekSet(true)}>
                                                    <span className={styles['dropdown-item-label']}>Sunday</span>
                                                </li>
                                            </SettingsDropdown>
                                        </SettingsSection>
                                        {/* <SettingsSection
                                        title='Language' 
                                        text='Select your language'>
                                            <SettingsDropdown label={settings.language}>
                                                <li className={styles['dropdown-item']} onClick={() => handleLanguageChange(LANGUAGES.english)}>
                                                    <span className={styles['dropdown-item-label']}>English</span>
                                                </li>
                                                <li className={styles['dropdown-item']} onClick={() => handleLanguageChange(LANGUAGES.polish)}>
                                                    <span className={styles['dropdown-item-label']}>Polish</span>
                                                </li>
                                            </SettingsDropdown>
                                        </SettingsSection> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>,document.querySelector('.modal-container'))
                }</>
)
}

export default Settings;