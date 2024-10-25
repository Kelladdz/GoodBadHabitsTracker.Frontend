import { createContext, useState } from 'react';

const CalendarContext = createContext();

function CalendarProvider({children}) {
    const [currentDate, setCurrentDate] = useState(new Date());
    

    return <CalendarContext.Provider value={{
        currentDate}}>
            {children}
		</CalendarContext.Provider>;
} 

export { CalendarProvider };
export default CalendarContext;