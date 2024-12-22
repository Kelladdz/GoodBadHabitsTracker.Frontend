import { useContext, useEffect } from 'react';

import HabitContext from '../../../context/habit';

import {HABIT_STATISTICS_PROPERTIES} from '../../../constants/habit-statistics-properties';
import {STREAK_ICON_ALTERNATE_LABEL} from '../../../constants/alternate-labels';

import StreakIcon from '../../../assets/svg/streak-icon.svg';

import styles from '../../../styles/StatisticCell.module.css';



export const StatisticCell = ({property}) => {
    const {completedResultsCount, failedResultsCount, skippedResultsCount, totalResultsCount, streak} = useContext(HabitContext);
    
    const value = () => {
        switch (property) {
            case HABIT_STATISTICS_PROPERTIES.streak:
                return streak;
            case HABIT_STATISTICS_PROPERTIES.completed:
                return completedResultsCount;
            case HABIT_STATISTICS_PROPERTIES.failed:
                return failedResultsCount;
            case HABIT_STATISTICS_PROPERTIES.total:
                return totalResultsCount;
            case HABIT_STATISTICS_PROPERTIES.skipped:
                return skippedResultsCount;
            default:
                return 0;
        }
    }

    useEffect(() => {
        value();
    },[]);
    return (
        <div className={styles['statistic-cell']}>
            {property === HABIT_STATISTICS_PROPERTIES.streak && <img className={styles['streak-icon']} src={StreakIcon} alt={STREAK_ICON_ALTERNATE_LABEL}/>}
            <div className={styles.info}>
                <span className={styles.label}>{property}</span>
                <span className={styles.value}>{value()}</span>
            </div>
        </div>)
}

export default StatisticCell;