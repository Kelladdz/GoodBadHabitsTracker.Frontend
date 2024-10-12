import StatisticCell from './StatisticCell';
import Calendar from './Calendar';
import CommentSection from './CommentSection';
import Chart from './Chart';

import { HABIT_STATISTICS_PROPERTIES } from '../../../constants/habit-statistics-properties';

import styles from '../../../styles/RightSection.module.css';

const RightSection = ({name}) => {
    return (
        <div className={styles['right-section']}>
            <div className={styles['label-box']}>
                <span className={styles.label}>{name}</span>
            </div>
            <div className={styles['habit-data']}>
                <div className={styles['l-side']}>
                    <div className={styles['statistics-grid']}>

                        <div className={styles.cell}>
                            <StatisticCell property={HABIT_STATISTICS_PROPERTIES.streak}/>
                        </div>

                        <div className={styles.cell}>
                            <StatisticCell property={HABIT_STATISTICS_PROPERTIES.completed}/>
                        </div>

                        <div className={styles.cell}>
                            <StatisticCell property={HABIT_STATISTICS_PROPERTIES.failed}/>
                        </div>

                        <div className={styles.cell}>
                            <StatisticCell property={HABIT_STATISTICS_PROPERTIES.total}/>
                        </div>

                        <div className={styles.cell}>
                            <StatisticCell property={HABIT_STATISTICS_PROPERTIES.skipped}/>
                        </div>

                    </div>
                    <Calendar />
                </div>
                <div className={styles['r-side']}>
                    <CommentSection />
                    <Chart />
                </div>
            </div>
        </div>
    )
}

export default RightSection;