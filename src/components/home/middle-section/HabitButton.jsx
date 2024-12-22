import styles from '../../../styles/HabitButton.module.css';

const HabitButton  = React.forwardRef(({props, onClick, children}, ref) => {

    return (
        <button ref={ref} className={styles['habit-button']} onClick={onClick}>
            {children}
        </button>);
});

export default HabitButton;