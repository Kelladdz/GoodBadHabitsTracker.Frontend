import { useContext } from 'react'

import SettingsContext from '../../../context/settings'

import HeaderButton from './HeaderButton'

import Logo from '../../../assets/svg/logo.svg'
import SettingsIcon from '../../../assets/svg/settings-icon.svg'
import ProfilePlaceholder from '../../../assets/svg/profile-icon-placeholder.svg'
import LogoutIcon from '../../../assets/svg/white-logout-icon.svg'

import { SETTINGS_ICON_ALTERNATE_LABEL, PROFILE_ICON_ALTERNATE_LABEL, LOGOUT_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels'

import styles from '../../../styles/Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../../hooks/useAuth'
import { logoutAction } from '../../../store/actions/authActions'


const Header = () => {
    const dispatch = useDispatch();
    const {toggleSettings} = useContext(SettingsContext);
    
    const profile = useSelector(state => state.user.user.picture);
    const handleSettingsClick = () => {
        toggleSettings(true);
    }

    const handleLogoutClick = () => {
        dispatch(logoutAction());
    }
    
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <img className={styles.logo} src={Logo} alt="Logo"/>
                <div className={styles['r-side']}>
                <HeaderButton icon={SettingsIcon} alt={SETTINGS_ICON_ALTERNATE_LABEL} onClick={handleSettingsClick}/>
                    <HeaderButton icon={profile ? profile : ProfilePlaceholder} alt={PROFILE_ICON_ALTERNATE_LABEL} onClick={() => console.log('Profile button clicked')}/>
                    <HeaderButton icon={LogoutIcon} alt={LOGOUT_ICON_ALTERNATE_LABEL} onClick={() => handleLogoutClick()}/>
                </div>
            </nav>
        </header>
    )
}

export default Header;