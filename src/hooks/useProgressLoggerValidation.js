import { useContext, useState } from "react";
import { useSelector } from "react-redux";

import HabitContext from "../context/habit";

export function useProgressLoggerValidation() {
    const form = useSelector(state => state.progressLoggingForm);

    const {activeHabit} = useContext(HabitContext);

    const [validationError, setValidationError] = useState();

    const isValid = () => {
        if (form.status === 0 && activeHabit.habitType !== 2 && form.progress < activeHabit.quantity) {
            setValidationError("If day result is complete, progress must be equal or greater than the quantity");
            return false;
        }
        if (form.status !== 0 && activeHabit.habitType !== 2 && form.progress >= activeHabit.quantity) {
            setValidationError("If day result is incomplete, progress must be less than the quantity");
            return false;
        }
        return true;
    }

    return {validationError, isValid};
} 