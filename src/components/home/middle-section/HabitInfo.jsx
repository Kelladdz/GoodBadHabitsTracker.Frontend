import styles from '../../../styles/HabitInfo.module.css';

const HabitInfo = ({name, habitType, progress, breakDays, quantity, isTimeBased}) => {
    return (
    <div className={styles['habit-info']}>
        <span className={styles.name}>{name}</span>
        {habitType !== 2 ?
            <span className={styles.progress}>{progress} / {isTimeBased ? quantity / 60 : quantity} {isTimeBased ? 'minutes' : 'times'}</span>
            :
            <span className={styles.progress}>Break days: {breakDays}</span>
        }
    </div>)
}

export default HabitInfo;