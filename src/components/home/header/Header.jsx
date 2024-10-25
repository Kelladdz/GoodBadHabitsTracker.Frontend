import HeaderButton from './HeaderButton'

import Logo from '../../../assets/svg/logo.svg'
import SettingsIcon from '../../../assets/svg/settings-icon.svg'
import ProfilePlaceholder from '../../../assets/svg/profile-icon-placeholder.svg'

import { HEADER_ICON_ALTERNATE_LABELS } from '../../../constants/alternate-labels'

import styles from '../../../styles/Header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <img className={styles.logo} src={Logo} alt="Logo"/>
                <div className={styles['r-side']}>
                    <HeaderButton icon={SettingsIcon} alt={HEADER_ICON_ALTERNATE_LABELS.settings} onClick={() => console.log('Settings button clicked')}/>
                    <HeaderButton icon={ProfilePlaceholder} alt={HEADER_ICON_ALTERNATE_LABELS.profile} onClick={() => console.log('Profile button clicked')}/>
                </div>
            </nav>
        </header>
    )
}

export default Header;