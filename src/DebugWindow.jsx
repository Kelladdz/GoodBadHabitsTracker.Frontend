import { useSelector } from "react-redux";
import styles from "./styles/DebugWindow.module.css";
export const DebugWindow = () => {
    const form = useSelector(state => state.goodHabitCreator);
    return (
        <div className={styles['debug-window']}>
            <span>Name: {form.name}</span>
            <span>Icon: {form.iconIndex}</span>
            <span>Type: {form.habitType}</span>
            <span>Quantity: {form.quantity}</span>
            <span>Time Based: {form.isTimeBased.toString()}</span>
            <span>Frequency: {form.frequency}</span>
            <span>Repeat Mode: {form.repeatMode}</span>
            <span>Repeat Days of Week: {form.repeatDaysOfWeek.join(', ')}</span>
            <span>Repeat Days of Month: {form.repeatDaysOfMonth.join(', ')}</span>
            <span>Repeat Interval: {form.repeatInterval}</span>
            <span>Start Date: {form.startDate}</span>
            <span>Group: {form.groupId}</span>
        </div>
    );
}

export default DebugWindow;