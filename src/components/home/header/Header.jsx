import { useContext } from 'react'

import SettingsContext from '../../../context/settings'

import HeaderButton from './HeaderButton'

import Logo from '../../../assets/svg/logo.svg'
import SettingsIcon from '../../../assets/svg/settings-icon.svg'
import ProfilePlaceholder from '../../../assets/svg/profile-icon-placeholder.svg'

import { SETTINGS_ICON_ALTERNATE_LABEL, PROFILE_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels'

import styles from '../../../styles/Header.module.css'
import { useSelector } from 'react-redux'


const Header = () => {
    const {toggleSettings} = useContext(SettingsContext);
    const profile = useSelector(state => state.user.user.picture);
    const handleSettingsClick = () => {
        toggleSettings(true);
    }
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <img className={styles.logo} src={Logo} alt="Logo"/>
                <div className={styles['r-side']}>
                    <HeaderButton icon={SettingsIcon} alt={SETTINGS_ICON_ALTERNATE_LABEL} onClick={handleSettingsClick}/>
                    <HeaderButton icon={profile ? profile : ProfilePlaceholder} alt={PROFILE_ICON_ALTERNATE_LABEL} onClick={() => console.log('Profile button clicked')}/>
                </div>
            </nav>
        </header>
    )
}

export default Header;