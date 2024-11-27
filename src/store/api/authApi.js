import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7154'}),
    endpoints: (builder) => {
        return {
        register: builder.mutation({
            query: ({userName, email, password, confirmPassword}) => {
                return {
                    url: `/api/auth/register`,
                    method: 'POST',
                    body: {userName, email, password, confirmPassword}
                }
            }
        })
    }
}})

export const {useRegisterMutation} = authApi;
export {authApi};