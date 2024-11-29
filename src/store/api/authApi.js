import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signIn = async (formData) => {
    try {
      const res = await API.post(import.meta.env.VITE_REACT_APP_LOGIN_LOCALHOST_URL, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return { error: null, data: res.data }
    } catch (error) {
      return handleApiError(error);
    }
  };