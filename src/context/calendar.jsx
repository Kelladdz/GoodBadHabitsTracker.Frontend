import { createContext, useState } from 'react';

const CalendarContext = createContext();

function CalendarProvider({children}) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const currentDateString = currentDate.toISOString().substring(0, 10);
    
    const changeCurrentDate = (date) => {
        setCurrentDate(date);
    }

    return <CalendarContext.Provider value={{
        currentDate, currentDateString, changeCurrentDate}}>
            {children}
		</CalendarContext.Provider>;
} 

export { CalendarProvider };
export default CalendarContext;