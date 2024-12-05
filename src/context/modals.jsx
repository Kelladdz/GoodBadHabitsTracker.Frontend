import React, { createContext, useEffect, useState } from 'react';

const ModalsContext = createContext();

function ModalsProvider({children}) {
    const [activeModal, setActiveModal] = useState(null);

    const toggleModal = (type) => {
        console.log('activeModal', type)
        setActiveModal(type);
    }

    useEffect(() => {
        console.log('activeModal', activeModal)
    }, [activeModal])
    
        return <ModalsContext.Provider value={{
            activeModal, toggleModal}}>
			{children}
			</ModalsContext.Provider>;
} 

export { ModalsProvider };
export default ModalsContext;