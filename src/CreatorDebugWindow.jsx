import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressLoggerContext from "./context/progress-logger";
import HabitCreatorContext from "./context/habit-creator";

import styles from "./styles/DebugWindow.module.css";

export const CreatorDebugWindow = () => {
    const goodHabitCreatorForm = useSelector(state => state.goodHabitCreator);

    return (
        <div className={styles['debug-window']}>
            <span>Habit name: {goodHabitCreatorForm.name}</span>
            <span>Icon index: {goodHabitCreatorForm.iconIndex}</span>
            <span>Habit type: {goodHabitCreatorForm.habitType}</span>
            <span>Quantity: {goodHabitCreatorForm.quantity}</span>
            <span>Is time based?: {goodHabitCreatorForm.isTimeBased && goodHabitCreatorForm.isTimeBased.toString()}</span>
            <span>Frequency: {goodHabitCreatorForm.frequency}</span>
            <span>Repeat Mode {goodHabitCreatorForm.repeatMode}</span>
            <span>Repeat Days Of Week: {goodHabitCreatorForm.repeatDaysOfWeek}</span>
            <span>Repeat Days Of Month: {goodHabitCreatorForm.repeatDaysOfMonth}</span>
            <span>Repeat Interval: {goodHabitCreatorForm.repeatInterval}</span>
            <span>Start date: {goodHabitCreatorForm.startDate}</span>
            <span>Group ID: {goodHabitCreatorForm.groupId}</span>
        </div> 
    );
}

export default CreatorDebugWindow;