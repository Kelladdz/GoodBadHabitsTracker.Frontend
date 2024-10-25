import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const habitsApi = createApi({
    reducerPath: 'habits',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7154'}),
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
        addHabit: builder.mutation({
            invalidatesTags: ['Habits'],
            query: ({name, habitType, iconId, startDate, isTimeBased, quantity, frequency, repeatMode, repeatDaysOfMonth, repeatDaysOfWeek, repeatInterval, reminderTimes, groupId}) => {
                return {
                    url: `/api/habits/`,
                    method: 'POST',
                    body: {name, habitType, iconId, startDate, isTimeBased, quantity, frequency, repeatMode, repeatDaysOfMonth, repeatDaysOfWeek, repeatInterval, reminderTimes, groupId}
                }
            }
        })
        }
    }
})

export const {useFetchHabitQuery, useFetchHabitsQuery, useAddHabitMutation} = habitsApi;
export {habitsApi};