import StreakIcon from '../../../assets/svg/streak-icon.svg';

import {HABIT_STATISTICS_PROPERTIES} from '../../../constants/habit-statistics-properties';
import {STREAK_ICON_ALTERNATE_LABEL} from '../../../constants/alternate-labels';

import styles from '../../../styles/StatisticCell.module.css';

export const StatisticCell = ({property}) => {
    return (
        <div className={styles['statistic-cell']}>
            {property === HABIT_STATISTICS_PROPERTIES.streak && <img className={styles['streak-icon']} src={StreakIcon} alt={STREAK_ICON_ALTERNATE_LABEL}/>}
            <div className={styles.info}>
                <span className={styles.label}>{property}</span>
                <span className={styles.value}>0</span>
            </div>
        </div>)
}

export default StatisticCell;