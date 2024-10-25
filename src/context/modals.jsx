import React, { createContext, useState } from 'react';

const ModalsContext = createContext();

function ModalsProvider({children}) {
    const [activeModal, setActiveModal] = useState(null);

    const toggleModal = (type) => {
        setActiveModal(type);
    }

        return <ModalsContext.Provider value={{
            activeModal, toggleModal}}>
			{children}
			</ModalsContext.Provider>;
} 

export { ModalsProvider };
export default ModalsContext;