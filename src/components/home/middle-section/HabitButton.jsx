import styles from '../../../styles/HabitButton.module.css';

const HabitButton = ({onClick, children}) => {

    return (
        <button className={styles['habit-button']} onClick={onClick}>
            {children}
        </button>);
}

export default HabitButton;