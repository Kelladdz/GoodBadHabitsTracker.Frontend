import React, { createContext, useState } from 'react';
import { CREATOR_TYPES } from '../constants/creator-types';

const HabitCreatorContext = createContext();

function HabitCreatorProvider({children}) {
    const [activeCreator, setActiveCreator] = useState();

    const toggleCreator = (type) => {
        setActiveCreator(type);
    }

        return <HabitCreatorContext.Provider value={{
            activeCreator, toggleCreator}}>
			{children}
			</HabitCreatorContext.Provider>;
} 

export { HabitCreatorProvider };
export default HabitCreatorContext;