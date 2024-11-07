import { Provider } from "react-redux";

import {store} from './store'

import { ContextMenuProvider } from "./context/context-menu";
import { CalendarProvider } from "./context/calendar";
import { ModalsProvider } from "./context/modals";
import { HabitCreatorProvider } from "./context/habit-creator";

import App from "./App";

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