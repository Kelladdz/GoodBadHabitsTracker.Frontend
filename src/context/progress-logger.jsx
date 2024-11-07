import { createContext, useState } from 'react';

const ProgressLoggerContext = createContext();

function ProgressLoggerProvider({children}) {
    const [isProgressLoggerOpen, setIsProgressLoggerOpen] = useState(false);

    const toggleProgressLogger = (flag) => {
        setIsProgressLoggerOpen(flag);
    }

    return <ProgressLoggerContext.Provider value={{
        isProgressLoggerOpen, toggleProgressLogger}}>
            {children}
		</ProgressLoggerContext.Provider>;
} 

export { ProgressLoggerProvider };
export default ProgressLoggerContext;