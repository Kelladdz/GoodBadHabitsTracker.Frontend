import { useContext, useState } from "react";
import { useSelector } from "react-redux";

import HabitContext from "../context/habit";

export function useProgressLoggerValidation() {
    const form = useSelector(state => state.progressLoggingForm);
    console.log(form)
    const {activeHabit} = useContext(HabitContext);

    const [validationError, setValidationError] = useState();

    const isValid = () => {
        console.log('form.status', form.status)
        console.log('form.status === 0', form.status === 0)
        console.log('activeHabit.habit.habitType', activeHabit.habit.habitType);
        console.log('activeHabit.habit.habitType === 0', activeHabit.habit.habitType === 0)
        console.log('form.progress', form.progress)
        console.log('activeHabit.habit.quantity', activeHabit.habit.quantity)
        console.log('form.progress < activeHabit.habit.quantity', form.progress < activeHabit.habit.quantity)
        if (form.status === 0 && activeHabit.habit.habitType === 0 && form.progress < activeHabit.habit.quantity) {
            setValidationError("If day result is complete and habit is good, progress must be equal or greater than the quantity");
            return false;
        }
        if (form.status !== 0 && activeHabit.habit.habitType === 0 && form.progress >= activeHabit.habit.quantity) {
            setValidationError("If day result is incomplete and habit is good, progress must be less than the quantity");
            return false;
        }
        if (form.status === 0 && activeHabit.habit.habitType === 1 && form.progress >= activeHabit.habit.quantity) {
            setValidationError("If day result is complete and habit type is limit, progress must be less than the quantity");
            return false;
        }
        if (form.status !== 0 && activeHabit.habit.habitType === 1 && form.progress < activeHabit.habit.quantity) {
            setValidationError("If day result is incomplete and habit type is limit, progress must be equal or greater than the quantity");
            return false;
        }
        return true;
    }

    return {validationError, isValid};
} 