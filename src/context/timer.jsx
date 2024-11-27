import React, { createContext, useState } from 'react';

const TimerContext = createContext();

function TimerProvider({children}) {
    const [isTimerOpen, setIsTimerOpen] = useState(false);

    const toggleTimer = (flag) => {
        setIsTimerOpen(flag);
    }

        return <TimerContext.Provider value={{
            isTimerOpen, toggleTimer}}>
			{children}
			</TimerContext.Provider>;
} 

export { TimerProvider };
export default TimerContext;