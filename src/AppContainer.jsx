import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import App from "./App";
import { ContextMenuProvider } from "./context/context-menu";
import { CalendarProvider } from "./context/calendar";
import { Provider } from "react-redux";
import { useFetchGroupsQuery, useFetchHabitsQuery } from "./store";
import loadingAnimationData from './assets/animations/loading-animation.json';
import styles from './styles/AppContainer.module.css';
import Lottie from "lottie-react";
import {getGroups} from './store/slices/groupsSlice';
import { getHabits } from "./store/slices/habitsSlice";
import {store} from './store'
import { ModalsProvider } from "./context/modals";
import { HabitCreatorProvider } from "./context/habit-creator";

const AppContainer = () => {
    return (
        <Provider store={store}>
            <ContextMenuProvider>
                    <CalendarProvider>
                            <ModalsProvider>
                                <HabitCreatorProvider>
                                    <App />
                                </HabitCreatorProvider>
                            </ModalsProvider>
                    </CalendarProvider>
            </ContextMenuProvider>
        </Provider>
            
        
    );
}

export default AppContainer;