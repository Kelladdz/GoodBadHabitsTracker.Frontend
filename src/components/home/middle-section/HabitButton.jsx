import styles from '../../../styles/HabitButton.module.css';
const HabitButton = ({children}) => {
    return (
        <button className={styles['habit-button']} onClick={console.log('Habit button clicked')}>
            {children}
        </button>);
}

export default HabitButton;