import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import Lottie from 'lottie-react';

import createAppStore from './store'

import { ContextMenuProvider } from "./context/context-menu";
import { CalendarProvider } from "./context/calendar";
import { ModalsProvider } from "./context/modals";
import { HabitCreatorProvider } from "./context/habit-creator";
import { CommentsProvider } from "./context/comments";
import { TimerProvider } from "./context/timer";
import { SettingsProvider } from "./context/settings";
import { AuthProvider } from "./context/auth";
import { CookiesProvider } from 'react-cookie';

import App from "./App";

import loadingAnimationData from './assets/animations/loading-animation.json';

import styles from "./styles/AppContainer.module.css";
import { PATHS } from "./constants/paths";

const ErrorComponent = ({ errorMessage }) => (
    <div className={styles.error}>{errorMessage}</div>
  );

const AppContainer = () => {
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeStore = async () => {
          try {
            const appStore = await createAppStore();
            setStore(appStore);
          } catch (err) {
            setError(`Error initializing the app: ${err.message}`);
          } finally {
            setLoading(false);
          }
        };
    
        initializeStore();
      }, []);

      if (loading || error) {
        return (
          <div className={styles['error-box']}>
            {loading ? <Lottie animationData={loadingAnimationData} /> : <ErrorComponent errorMessage={error} />}
          </div>
        );
      }  

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