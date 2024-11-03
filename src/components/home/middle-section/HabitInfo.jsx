import styles from '../../../styles/HabitInfo.module.css';

const HabitInfo = ({name, progress, quantity, isTimeBased}) => {
    return (
    <div className={styles['habit-info']}>
        <span className={styles.name}>{name}</span>
        <span className={styles.progress}>{progress} / {isTimeBased ? quantity / 60 : quantity} {isTimeBased ? 'minutes' : 'times'}</span>
    </div>)
}

export default HabitInfo;