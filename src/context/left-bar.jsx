import { createContext, useState } from 'react';

import { LEFT_BAR_BUTTON_LABELS } from '../constants/button-labels';

const LeftBarContext = createContext();

function LeftBarProvider({children}) {
    const [activeGroup, setActiveGroup] = useState(LEFT_BAR_BUTTON_LABELS.allHabits);
    const [order, setOrder] = useState(null);
    const [formMode, setFormMode] = useState(false);
    const [groupToEdit, setGroupToEdit] = useState();

    const toggleActiveGroup = (group) => {
        console.log(`Group ${group} has been toggled`);
        setActiveGroup(group);
    }

    const toggleOrder = (order) => {
        console.log(`Order ${order} has been toggled`);
        setOrder(order);
    }

    const toggleFormMode = (flag) => {
        console.log(`Form mode has been toggled`);
        setFormMode(flag);
    }

    const toggleEditModeToGroup = () => {
        setGroupToEdit(activeGroup);
    }

    return <LeftBarContext.Provider value={{
            activeGroup, toggleActiveGroup,
            order, toggleOrder,
            formMode, toggleFormMode,
            groupToEdit, toggleEditModeToGroup}}>
            {children}
		</LeftBarContext.Provider>;
} 

export { LeftBarProvider };
export default LeftBarContext;