import { createContext, useState } from 'react';

const ContextMenuContext = createContext();

function ContextMenuProvider({children}) {
    const [activeMenu, setActiveMenu] = useState(null);

    const toggleContextMenu = (type, x, y) => {
        console.log(`Context menu of type ${type} has been toggled`);
        console.log(`Position: ${x}, ${y}`);
        setActiveMenu({type: type, position: {x: x, y: y}});
    }

    const hideContextMenu = () => {
        setActiveMenu(null);
    }


    return <ContextMenuContext.Provider value={{
            activeMenu, toggleContextMenu, hideContextMenu}}>
            {children}
		</ContextMenuContext.Provider>;
} 

export { ContextMenuProvider };
export default ContextMenuContext;