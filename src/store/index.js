import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { goodHabitCreatorReducer } from "./slices/goodHabitCreatorSlice"
import { groupsApi } from "./api/groupsApi"
import { habitsApi } from "./api/habitsApi"

export const store = configureStore({
    reducer: {
        goodHabitCreator: goodHabitCreatorReducer,
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
    resetForm} from "./slices/goodHabitCreatorSlice";
export {useFetchHabitQuery, useFetchHabitsQuery, useAddHabitMutation} from "./api/habitsApi";
export {useFetchGroupQuery, useFetchGroupsQuery, useAddGroupMutation, useRenameGroupMutation, useDeleteGroupMutation} from "./api/groupsApi";

