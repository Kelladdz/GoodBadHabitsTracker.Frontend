import GroupIcon from '../../../assets/svg/group-icon.svg';

import { GROUP_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import styles from '../../../styles/GroupButton.module.css';
const GroupButton = ({label}) => {
    return (
        <button className={styles['group-button']} onClick={console.log(`${label} group button clicked`)}>
            <div className={styles['icon-box']}>
                <img className={styles.icon} src={GroupIcon} alt={GROUP_ICON_ALTERNATE_LABEL}/>
            </div>
            <span className={styles.label}>{label}</span>
        </button>
    );
}

export default GroupButton;