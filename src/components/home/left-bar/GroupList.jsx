import GroupButton from './GroupButton';

import styles from '../../../styles/GroupList.module.css';

const GroupList = () => {
    return (
        <div className={styles['group-list']}>
            <span className={styles.label}>Groups</span>
            <nav className={styles.btns}>
                <GroupButton label="Group 1"/>
                <GroupButton label="Group 2"/>
                <GroupButton label="Group 3"/>
            </nav>
            
        </div>
    )
}

export default GroupList;