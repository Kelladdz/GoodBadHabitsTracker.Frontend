import { createContext, useState } from 'react';

const HabitContext = createContext();

function HabitProvider({children}) {
    const [activeHabit, setActiveHabit] = useState(null);

    const toggleHabit = (habit) => {
        setActiveHabit(habit);
    }

    return <HabitContext.Provider value={{
        activeHabit, toggleHabit}}>
            {children}
		</HabitContext.Provider>;
} 

export { HabitProvider };
export default HabitContext;