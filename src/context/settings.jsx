import React, { createContext, useState } from 'react';

const SettingsContext = createContext();

function SettingsProvider({children}) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const toggleSettings = (flag) => {
        setIsSettingsOpen(flag);
    }

        return <SettingsContext.Provider value={{
            isSettingsOpen, toggleSettings}}>
			{children}
			</SettingsContext.Provider>;
} 

export { SettingsProvider };
export default SettingsContext;