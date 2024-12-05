import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { goodHabitCreatorReducer } from "./slices/goodHabitCreatorSlice"
import { progressLoggingFormReducer } from "./slices/progressLoggingFormSlice"
import { groupsApi } from "./api/groupsApi"
import { habitsApi } from "./api/habitsApi"
import { settingsReducer } from "./slices/settingsSlice"
import { authReducer } from "./slices/authSlice"
import { registerReducer } from "./slices/registerSlice"
import { initializeAuth } from "./actions/authActions"
import { userReducer } from "./slices/userSlice"
import { calendarReducer } from "./slices/calendarSlice"
import { groupsReducer } from "./slices/groupsSlice"
import tokenMiddleware from "../middleware/TokenMiddleware"
import { thunk } from "redux-thunk"

const createAppStore = async () => {
    try {
        const store = configureStore({
            reducer: {
                goodHabitCreator: goodHabitCreatorReducer,
                progressLoggingForm: progressLoggingFormReducer,
                settings: settingsReducer,
                [groupsApi.reducerPath]: groupsApi.reducer,
                [habitsApi.reducerPath]: habitsApi.reducer,
                auth: authReducer,
                user: userReducer,
                register: registerReducer,
                calendar: calendarReducer
            },
            middleware: (getDefaultMiddleware) => { return getDefaultMiddleware({
                serializableCheck: false
            })
                .concat(habitsApi.middleware)
                .concat(groupsApi.middleware)
                .concat(tokenMiddleware)
                .concat(thunk);
            }
        })
        await store.dispatch(initializeAuth());
        setupListeners(store.dispatch);

        return store;
    } catch (err) {
        throw new Error(`Error initializing the app: ${err.message}`);
    }
}

export default createAppStore;
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
export {changeFirstDayOfWeek, changeLanguage} from "./slices/settingsSlice";
export {setAccessToken, setRefreshToken, setUserData, loginSuccess, loginFail, signUpSuccess, signUpFail, logout, setCredentials, login, getExternalTokens, refreshTokenSuccess, refreshTokenFail, setInitialAuthState } from './slices/authSlice';
export {getUser} from './slices/userSlice';
export {changeUserName, toggleUserNameError, 
    changeEmail, toggleEmailError,
    changePassword, togglePasswordError,
    changeConfirmPassword, toggleConfirmPasswordError} from './slices/registerSlice';
export {changeCurrentDate, previousMonth, nextMonth, setCalendarDays, changeFirstDayOfWeekToMonday, changeFirstDayOfWeekToSunday, setFirstDayOnCalendar} from "./slices/calendarSlice";   
export {
    useFetchHabitQuery, 
    useFetchHabitsQuery, 
    useSearchHabitsQuery, 
    useAddHabitMutation, 
    useDeleteHabitMutation, 
    useDeleteAllHabitsMutation,
    useAddToGroupMutation, 
    useAddDayResultMutation, 
    useUpdateDayResultMutation,
    useDeleteAllProgressMutation,
    useDailyUpdateMutation,
    useAddCommentMutation,
    useEditCommentMutation,
    useDeleteCommentMutation} from "./api/habitsApi";
export {useFetchGroupQuery, useFetchGroupsQuery, useAddGroupMutation, useRenameGroupMutation, useDeleteGroupMutation} from "./api/groupsApi";

