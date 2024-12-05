import { createSlice } from '@reduxjs/toolkit';

const groupsSlice = createSlice({
    name: 'groups',
    initialState: {
        groups: [],
        activeGroup: null
    },
    reducers: {
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        setActiveGroup: (state, action) => {
            state.activeGroup = action.payload;
        }
    }
})

export const {setGroups, setActiveGroup} = groupsSlice.actions;
export const groupsReducer = groupsSlice.reducer;