import styles from '../../../styles/HabitButton.module.css';

const HabitButton = ({children}) => {
    const handleClick = () => {
        console.log('Habit button clicked');
    }
    return (
        <button className={styles['habit-button']} onClick={handleClick}>
            {children}
        </button>);
}

export default HabitButton;