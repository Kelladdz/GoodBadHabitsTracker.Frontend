import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const groupsApi = createApi({
    reducerPath: 'groups',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://localhost:7154', 
    }),
    endpoints: (builder) => {
        return {
        fetchGroup: builder.query({
            query: (id) => {
                return {
                    url: `/api/groups/${id}`,
                    method: 'GET'
                }
            }
        }),
        fetchGroups: builder.query({
            providesTags: ['Groups'],
            query: () => {
                return {
                    url: `/api/groups/`,
                    method: 'GET'
                }
            }
        }),
        addGroup: builder.mutation({
            invalidatesTags: ['Groups'],
            query: (name) => {
                return {
                    url: `/api/groups/`,
                    method: 'POST',
                    body: {name}
                }
            }
        }),
        renameGroup: builder.mutation({
            invalidatesTags: ['Groups'],
            query: ({id, name}) => {
                return {
                    url: `/api/groups/${id}`,
                    method: 'PATCH',
                    jsonContentType: 'application/json-patch+json',
                    body: [
                        {
                            "op": "replace",
                            "path": "/name",
                            "value": name
                        }
                    ]
                }
            }
        }),
        deleteGroup: builder.mutation({
            invalidatesTags: ['Groups'],
            query: (id) => {
                return {
                    url: `/api/groups/${id}`,
                    method: 'DELETE'
                }
            }
        })
    }}
});

export const {useFetchGroupQuery, useFetchGroupsQuery, useAddGroupMutation, useRenameGroupMutation, useDeleteGroupMutation} = groupsApi;
export {groupsApi};