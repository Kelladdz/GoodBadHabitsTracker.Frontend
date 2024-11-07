import { useContext } from "react";
import { useSelector } from "react-redux";

import ProgressLoggerContext from "./context/progress-logger";
import HabitCreatorContext from "./context/habit-creator";

import styles from "./styles/DebugWindow.module.css";

export const DebugWindow = () => {
    const goodHabitCreatorForm = useSelector(state => state.goodHabitCreator);
    const progressLoggerForm = useSelector(state => state.progressLoggingForm);

    const {isProgressLoggerOpen} = useContext(ProgressLoggerContext);
    const {activeCreator} = useContext(HabitCreatorContext)

    return (
        activeCreator && <div className={styles['debug-window']}>
            <span>Name: {goodHabitCreatorForm.name}</span>
            <span>Icon: {goodHabitCreatorForm.iconIndex}</span>
            <span>Type: {goodHabitCreatorForm.habitType}</span>
            <span>Quantity: {goodHabitCreatorForm.quantity}</span>
            <span>Time Based: {goodHabitCreatorForm.isTimeBased.toString()}</span>
            <span>Frequency: {goodHabitCreatorForm.frequency}</span>
            <span>Repeat Mode: {goodHabitCreatorForm.repeatMode}</span>
            <span>Repeat Days of Week: {goodHabitCreatorForm.repeatDaysOfWeek.join(', ')}</span>
            <span>Repeat Days of Month: {goodHabitCreatorForm.repeatDaysOfMonth.join(', ')}</span>
            <span>Repeat Interval: {goodHabitCreatorForm.repeatInterval}</span>
            <span>Start Date: {goodHabitCreatorForm.startDate}</span>
            <span>Group: {goodHabitCreatorForm.groupId}</span>
        </div> 
        ||
        isProgressLoggerOpen && <div className={styles['debug-window']}>
            <span>Status: {progressLoggerForm.status}</span>
            <span>Progress: {progressLoggerForm.progress}</span>
            <span>Date: {progressLoggerForm.date}</span>
        </div>
    );
}

export default DebugWindow;