import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../slices/authSlice";
import { PATHS } from "../../constants/paths";

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:7154',
    prepareHeaders: (headers) => {
      const accessToken = JSON.parse(localStorage.getItem('profile'))?.accessToken;
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  });

const unauthorizedUserQuery = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
  
    if (result.error && result.error.status === 401) {
        localStorage.removeItem('profile');
        api.dispatch(logout());
        window.location.href = PATHS.auth;
    }
  
    return result;
  };

const groupsApi = createApi({
    reducerPath: 'groups',
    baseQuery: unauthorizedUserQuery,
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