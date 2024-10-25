import { createSlice } from '@reduxjs/toolkit';

const groupsSlice = createSlice({
    name: 'groups',
    initialState: {
        group: null,
        groups: []
    },
    reducers: {
        getGroup: (state, action) => {
            state.group = action.payload;
        },
        getGroups: (state, action) => {
            state.groups = action.payload ? action.payload.groups : [];
        }
    }
})

export const {getGroup, getGroups} = groupsSlice.actions;
export const groupsReducer = groupsSlice.reducer;