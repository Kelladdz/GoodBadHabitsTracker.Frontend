import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { goodHabitCreatorReducer } from "./slices/goodHabitCreatorSlice"
import { progressLoggingFormReducer } from "./slices/progressLoggingFormSlice"
import { groupsApi } from "./api/groupsApi"
import { habitsApi } from "./api/habitsApi"
import { authApi } from "./api/authApi"
import { habitsReducer } from "./slices/habitsSlice"
import { settingsReducer } from "./slices/settingsSlice"
import { authReducer } from "./slices/authSlice"
import { registerReducer } from "./slices/registerSlice"
import tokenMiddleware from "../middleware/TokenMiddleware"

export const store = configureStore({
    reducer: {
        goodHabitCreator: goodHabitCreatorReducer,
        progressLoggingForm: progressLoggingFormReducer,
        habits: habitsReducer,
        settings: settingsReducer,
        [groupsApi.reducerPath]: groupsApi.reducer,
        [habitsApi.reducerPath]: habitsApi.reducer,
        auth: authReducer,
        register: registerReducer,
    },
    middleware: (getDefaultMiddleware) => { return getDefaultMiddleware({
        serializableCheck: false
    })
        .concat(habitsApi.middleware)
        .concat(groupsApi.middleware)
        .concat(tokenMiddleware);
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
export {changeFirstDayOfWeek, changeLanguage} from "./slices/settingsSlice";
export {logout, setCredentials, login, getExternalTokens } from './slices/authSlice';
export {changeUserName, toggleUserNameError, 
    changeEmail, toggleEmailError,
    changePassword, togglePasswordError,
    changeConfirmPassword, toggleConfirmPasswordError} from './slices/registerSlice';
export {
    useFetchHabitQuery, 
    useFetchHabitsQuery, 
    useSearchHabitsQuery, 
    useAddHabitMutation, 
    useDeleteHabitMutation, 
    useAddToGroupMutation, 
    useAddDayResultMutation, 
    useUpdateDayResultMutation,
    useDailyUpdateMutation,
    useAddCommentMutation,
    useEditCommentMutation,
    useDeleteCommentMutation} from "./api/habitsApi";
export {useFetchGroupQuery, useFetchGroupsQuery, useAddGroupMutation, useRenameGroupMutation, useDeleteGroupMutation} from "./api/groupsApi";
export {useRegisterMutation} from "./api/authApi";
