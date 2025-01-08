import StatisticCell from './StatisticCell';
import Calendar from '../shared/Calendar';
import CommentSection from './CommentSection';
import Chart from './Chart';

import { HABIT_STATISTICS_PROPERTIES } from '../../../constants/habit-statistics-properties';
import { CALENDAR_TYPES } from '../../../constants/calendar-types';
import styles from '../../../styles/RightSection.module.css';
import { useContext, useEffect } from 'react';
import HabitContext from '../../../context/habit';
import { CHART_TYPES } from '../../../constants/chart-types';
import ChartContext from '../../../context/chart';
import { useFetchHabitQuery } from '../../../store';

const RightSection = () => {
    const {activeHabit, toggleHabit, activeDetails, toggleDetails} = useContext(HabitContext);
    const {toggleChart} = useContext(ChartContext);
    const {data, error, isLoading} = useFetchHabitQuery(activeHabit.habit.id, {skip: !activeHabit})

    const handleChartTypeClick = (type) => {
        toggleChart(type);
    }

    useEffect(() => {
        if (data && !isLoading) {
            console.log(data);
        }
    },[data, isLoading])
    return (
        <div className={`${styles['right-section']} ${!activeDetails ? styles.hide : ''}`}>
            <div className={styles['label-box']}>
                <button className={styles['back-btn']} onClick={() => toggleDetails(false)}>Back</button>
                <span className={styles.label}>{activeHabit.habit.name}</span>
            </div>
            <div className={styles['habit-data']}>
                <div className={styles['l-side']}>
                    <div className={styles['statistics-grid']}>

                        <div className={styles.cell}>
                            <StatisticCell value={data && data.stats.streak} property={HABIT_STATISTICS_PROPERTIES.streak}/>
                        </div>

                        <div className={styles.cell}>
                            <StatisticCell value={data && data.stats.completed} property={HABIT_STATISTICS_PROPERTIES.completed}/>
                        </div>

                        <div className={styles.cell}>
                            <StatisticCell value={data && data.stats.failed} property={HABIT_STATISTICS_PROPERTIES.failed}/>
                        </div>

                        <div className={styles.cell}>
                            <StatisticCell value={data && data.stats.total} property={HABIT_STATISTICS_PROPERTIES.total}/>
                        </div>

                        <div className={styles.cell}>
                            <StatisticCell value={data && data.stats.skipped} property={HABIT_STATISTICS_PROPERTIES.skipped}/>
                        </div>

                    </div>
                    <Calendar withoutArrows cellSize='3rem' headerPadding='0.5rem' type={CALENDAR_TYPES.main}/>
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