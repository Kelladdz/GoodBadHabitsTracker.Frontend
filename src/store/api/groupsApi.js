import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';

import { logout } from "../slices/authSlice";
import { PATHS } from "../../constants/paths";
import { useAuth } from "../../hooks/useAuth";
import { logoutAction, refreshTokenAction } from "../actions/authActions";
import { useDispatch } from "react-redux";

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:7154',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const accessToken = JSON.parse(localStorage.getItem('profile'))?.accessToken;
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  });

const unauthorizedUserQuery = async (args, store, extraOptions) => {
    
    let result = await baseQuery(args, store, extraOptions);
    console.log(result);    
    if (result.error && result.error.status === 401) {
        const accessToken = JSON.parse(localStorage.getItem('profile'))?.accessToken;
        console.log('Unauthorized user query');
        const refreshToken = Cookies.get("__Secure-Rt");
        console.log(refreshToken);
        if (!accessToken || !refreshToken) {
            store.dispatch(logoutAction());
        }
        const payload = await store.dispatch(refreshTokenAction(refreshToken));
        if (payload) {
            result = await baseQuery(args, store, extraOptions);
        } else {
            store.dispatch(logoutAction());
        }
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