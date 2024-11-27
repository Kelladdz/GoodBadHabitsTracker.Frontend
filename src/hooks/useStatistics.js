import { useContext, useEffect, useState } from "react";

import HabitContext from "../context/habit";

export function useStatistics() {
    const {activeHabit} = useContext(HabitContext);



    

    return {completedResultsCount, failedResultsCount, skippedResultsCount, totalResultsCount, streak};
}