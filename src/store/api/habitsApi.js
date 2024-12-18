import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:7154',
    prepareHeaders: (headers) => {
      const accessToken = JSON.parse(localStorage.getItem('profile'))?.accessToken;
      console.log(accessToken);
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
        // api.dispatch(logout());
        // window.location.href = PATHS.auth;
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
            query: ({id, index, date, status, progress}) => {
                return {
                    url: `/api/habits/${id}`,
                    method: 'PATCH',
                    jsonContentType: 'application/json-patch+json',
                    body: [
                        {
                            "op": "replace",
                            "path": `/dayResults/${index}`,
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
            query: ({id, body, date}) => {
                return {
                    url: `/api/habits/${id}`,
                    method: 'PATCH',
                    jsonContentType: 'application/json-patch+json',
                    body: [
                        {
                            "op": "add",
                            "path": "/comments/-",
                            "value": {
                                "Body": body,
                                "Date": date
                            }
                        }
                    ]
                }
            }
        }),
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

export const {useFetchHabitQuery, useFetchHabitsQuery, useSearchHabitsQuery, useAddHabitMutation, useDeleteHabitMutation, useDeleteAllHabitsMutation, useAddToGroupMutation, useAddDayResultMutation, useUpdateDayResultMutation, useDeleteAllProgressMutation, useDailyUpdateMutation, useAddCommentMutation, useEditCommentMutation, useDeleteCommentMutation} = habitsApi;
export {habitsApi};