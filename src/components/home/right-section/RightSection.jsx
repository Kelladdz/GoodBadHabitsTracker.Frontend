import StatisticCell from './StatisticCell';
import Calendar from '../shared/Calendar';
import CommentSection from './CommentSection';
import Chart from './Chart';

import { HABIT_STATISTICS_PROPERTIES } from '../../../constants/habit-statistics-properties';
import { CALENDAR_TYPES } from '../../../constants/calendar-types';

import styles from '../../../styles/RightSection.module.css';
import { useContext } from 'react';
import HabitContext from '../../../context/habit';
import { CHART_TYPES } from '../../../constants/chart-types';
import ChartContext from '../../../context/chart';

const RightSection = () => {
    const {activeHabit} = useContext(HabitContext);
    const {toggleChart} = useContext(ChartContext   );

    const handleChartTypeClick = (type) => {
        toggleChart(type);
    }
    return (
        <div className={styles['right-section']}>
            <div className={styles['label-box']}>
                <span className={styles.label}>{activeHabit.name}</span>
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
                    <Calendar withoutArrows cellSize='2.93rem' headerPadding='0.5rem' type={CALENDAR_TYPES.main}/>
                </div>
                <div className={styles['r-side']}>
                    <Chart />
                    <div className={styles.btns}>
                        <button className={styles.btn} onClick={() => handleChartTypeClick(CHART_TYPES.streaks)}>Streak</button>
                        <button className={styles.btn} onClick={() => handleChartTypeClick(CHART_TYPES.completes)}>Completes</button>
                        <button className={styles.btn} onClick={() => handleChartTypeClick(CHART_TYPES.fails)}>Fails</button>
                        
                    </div>
                    <CommentSection />
                </div>
            </div>
        </div>
    )
}

export default RightSection;