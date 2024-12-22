import Cookies from 'js-cookie';

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutAction, refreshTokenAction } from "../actions/authActions";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import HabitContext from '../../context/habit';


const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:7154',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const accessToken = JSON.parse(localStorage.getItem('profile'))?.accessToken;
      console.log(accessToken);
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
                console.log(payload)
                result = await baseQuery(args, store, extraOptions);
            } else {
                store.dispatch(logoutAction());
            }
          }
            return result;
    };

const habitsApi = createApi({
    reducerPath: 'habits',
    baseQuery: unauthorizedUserQuery,
    endpoints: (builder) => {
        return {
        fetchHabit: builder.query({
            query: (id) => {
                return {
                    url: `/api/habits/${id}`,
                    method: 'GET'
                }
            }
        }),
        fetchHabits: builder.query({
            providesTags: ['Habits'],
            query: () => {
                return {
                    url: `/api/habits/`,
                    method: 'GET'
                }
            }
        }),
        searchHabits: builder.query({
            providesTags: ['Habits'],
            query: ({term, date}) => {
                return {
                    url: `/api/habits/search?term=${term}&date=${date}`,
                    method: 'GET'
                }
                
            }
        }),
        addHabit: builder.mutation({
            invalidatesTags: ['Habits'],
            query: ({name, habitType, iconId, startDate, isTimeBased, quantity, frequency, repeatMode, repeatDaysOfMonth, repeatDaysOfWeek, repeatInterval, reminderTimes, groupId}) => {
                return {
                    url: `/api/habits/`,
                    method: 'POST',
                    body: {name, habitType, iconId, startDate, isTimeBased, quantity, frequency, repeatMode, repeatDaysOfMonth, repeatDaysOfWeek, repeatInterval, reminderTimes, groupId}
                }
            }
        }),
        updateHabit: builder.mutation({
            invalidatesTags: ['Habits'],
            query: ({id, operations}) => {
                return {
                    url: `/api/habits/${id}`,
                    method: 'PATCH',
                    jsonContentType: 'application/json',
                    body: operations
                }
            }
        }),
        deleteHabit: builder.mutation({
            invalidatesTags: ['Habits'],
            query: (id) => {
                return {
                    url: `/api/habits/${id}`,
                    method: 'DELETE'
                }
            }
        }),
        deleteAllHabits: builder.mutation({
            invalidatesTags: ['Habits'],
            query: () => {
                return {
                    url: `/api/habits`,
                    method: 'DELETE'
                }
            }
        }),
        addToGroup: builder.mutation({
            invalidatesTags: ['Habits'],
            query: ({habitId, groupId}) => {
                return {
                    url: `/api/habits/${habitId}`,
                    method: 'PATCH',
                    jsonContentType: 'application/json-patch+json',
                    body: [
                        {
                            "op": "replace",
                            "path": "/groupId",
                            "value": groupId
                        }
                    ]
                }
            }
        }),
        addDayResult: builder.mutation({
            invalidatesTags: ['Habits'],
            query: ({id, date, status, progress}) => {
                return {
                    url: `/api/habits/${id}`,
                    method: 'PATCH',
                    jsonContentType: 'application/json-patch+json',
                    body: [
                        {
                            "op": "add",
                            "path": "/dayResults/-",
                            "value": {
                                "Progress": progress,
                                "Status": status,
                                "Date": date
                            }
                        }
                    ]
                }
            }
        }),
        updateDayResult: builder.mutation({
            invalidatesTags: ['Habits'],
            query: ({habitId, id, status, progress}) => {
                return {
                    url: `/api/habits/${habitId}/day-results/${id}`,
                    method: 'PUT',
                    body: {progress, status} 
                }
            }
        }),
        deleteAllProgress: builder.mutation({
            invalidatesTags: ['Habits'],
            query: () => {
                return {
                    url: `/api/habits/reset`,
                    method: 'PATCH'
                }
            }
        }),
        dailyUpdate: builder.mutation({
            invalidatesTags: ['Habits'],
            query: ({id, docs}) => {
                console.log(docs)
                return {
                    url: `/api/habits/${id}`,
                    method: 'PATCH',
                    jsonContentType: 'application/json-patch+json',
                    body: [...docs]
                }
            }
        }),
        addComment: builder.mutation({
            invalidatesTags: ['Habits'],
            query: ({habitId, body, date}) => {
                return {
                    url: `/api/habits/${habitId}/comments`,
                    method: 'POST',
                    body: {body, date}
                }
                    
                }
            }
        ),
        editComment: builder.mutation({
            invalidatesTags: ['Habits'],
            query: ({id, body, date, index}) => {
                return {
                    url: `/api/habits/${id}`,
                    method: 'PATCH',
                    jsonContentType: 'application/json-patch+json',
                    body: [
                        {
                            "op": "replace",
                            "path": `/comments/${index}`,
                            "value": {
                                "Body": body,
                                "Date": date
                            }
                        }
                    ]
                }
            }
        }),
        deleteComment: builder.mutation({
            invalidatesTags: ['Habits'],
            query: ({id, index}) => {
                return {
                    url: `/api/habits/${id}`,
                    method: 'PATCH',
                    jsonContentType: 'application/json-patch+json',
                    body: [
                        {
                            "op": "remove",
                            "path": `/comments/${index}`
                        }
                    ]
                }
            }
        }),
    }
}})

export const {useFetchHabitQuery, useFetchHabitsQuery, useSearchHabitsQuery, useAddHabitMutation, useUpdateHabitMutation, useDeleteHabitMutation, useDeleteAllHabitsMutation, useAddToGroupMutation, useUpdateDayResultMutation, useAddDayResultMutation, useDeleteAllProgressMutation, useDailyUpdateMutation, useAddCommentMutation, useEditCommentMutation, useDeleteCommentMutation} = habitsApi;
export {habitsApi};