import styles from '../../../styles/HabitInfo.module.css';

const HabitInfo = ({name, progress, quantity}) => {
    return (
    <div className={styles['habit-info']}>
        <span className={styles.name}>{name}</span>
        <span className={styles.progress}>{progress} / {quantity} minutes</span>
    </div>)
}

export default HabitInfo;