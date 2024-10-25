import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ORDERED_DAYS_OF_MONTH_SHORT } from "../constants/days-of-month";
import { set } from "lodash";

export function useOrderedNumbersShortened() {
    const repeatDaysOfMonth = useSelector(state => state.goodHabitCreator.repeatDaysOfMonth);

    const [orderedNumbersShortened, setOrderedNumbersShortened] = useState([]);

    useEffect(() => {
        if (repeatDaysOfMonth.length > 0) {
            let newNumbersArray = [];
            repeatDaysOfMonth.forEach((number) => {
                newNumbersArray.push(ORDERED_DAYS_OF_MONTH_SHORT[number - 1]);
            });
            setOrderedNumbersShortened([newNumbersArray]);
        }
    }, [repeatDaysOfMonth]);

    return orderedNumbersShortened;
}