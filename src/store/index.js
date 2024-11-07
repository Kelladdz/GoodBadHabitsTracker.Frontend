import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { goodHabitCreatorReducer } from "./slices/goodHabitCreatorSlice"
import { progressLoggingFormReducer } from "./slices/progressLoggingFormSlice"
import { groupsApi } from "./api/groupsApi"
import { habitsApi } from "./api/habitsApi"
import { habitsReducer } from "./slices/habitsSlice"

export const store = configureStore({
    reducer: {
        goodHabitCreator: goodHabitCreatorReducer,
        progressLoggingForm: progressLoggingFormReducer,
        habits: habitsReducer,
        [groupsApi.reducerPath]: groupsApi.reducer,
        [habitsApi.reducerPath]: habitsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => { return getDefaultMiddleware({
        serializableCheck: false
    })
        .concat(habitsApi.middleware)
        .concat(groupsApi.middleware)
    }
})

setupListeners(store.dispatch);

export {
    changeName, 
    changeIcon,
    changeHabitType, 
    changeQuantity, 
    changeIsTimeBased,
    changeFrequency,
    changeRepeatMode, 
    addRepeatDayOfWeek, 
    removeRepeatDayOfWeek, 
    clearRepeatDaysOfWeek,
    addRepeatDayOfMonth, 
    removeRepeatDayOfMonth,
    clearRepeatDaysOfMonth,
    changeRepeatInterval,
    changeStartDate,
    changeGroup,
    resetForm,
    fillForm} from "./slices/goodHabitCreatorSlice";
export {
    changeProgress,
    changeStatus,
    changeDate,
    resetProgressLoggingForm,
    fillProgressLoggingForm} from "./slices/progressLoggingFormSlice";
export {getHabit, getHabits} from "./slices/habitsSlice";
export {
    useFetchHabitQuery, 
    useFetchHabitsQuery, 
    useSearchHabitsQuery, 
    useAddHabitMutation, 
    useDeleteHabitMutation, 
    useAddToGroupMutation, 
    useAddDayResultMutation, 
    useUpdateDayResultMutation,
    useDailyUpdateMutation} from "./api/habitsApi";
export {useFetchGroupQuery, useFetchGroupsQuery, useAddGroupMutation, useRenameGroupMutation, useDeleteGroupMutation} from "./api/groupsApi";

