import { Provider } from "react-redux";

import {store} from './store'

import { ContextMenuProvider } from "./context/context-menu";
import { CalendarProvider } from "./context/calendar";
import { ModalsProvider } from "./context/modals";
import { HabitCreatorProvider } from "./context/habit-creator";
import { CommentsProvider } from "./context/comments";
import { TimerProvider } from "./context/timer";
import { SettingsProvider } from "./context/settings";

import App from "./App";
import { AuthProvider } from "./context/auth";

const AppContainer = () => {
    return (
        <Provider store={store}>
            <ContextMenuProvider>
                    <CalendarProvider>
                            <ModalsProvider>
                                <HabitCreatorProvider>
                                    <CommentsProvider>
                                        <TimerProvider>
                                            <SettingsProvider>
                                                <AuthProvider>
                                                    <App />
                                                </AuthProvider>
                                            </SettingsProvider>
                                        </TimerProvider>
                                    </CommentsProvider>
                                </HabitCreatorProvider>
                            </ModalsProvider>
                    </CalendarProvider>
            </ContextMenuProvider>
        </Provider>
            
        
    );
}

export default AppContainer;