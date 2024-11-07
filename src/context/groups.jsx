import { createContext, useState } from 'react';

const GroupsContext = createContext();

function GroupsProvider({children}) {
    const [groups, setGroups] = useState(null);

    const groupsUpdate = (g) => {
        setGroups(g);
    }

    return <GroupsContext.Provider value={{
        groups, groupsUpdate}}>
            {children}
		</GroupsContext.Provider>;
} 

export { GroupsProvider };
export default GroupsContext;