import axios from "axios";
import { isValidToken } from "../../utils/authUtils";
import { setAccessToken, setRefreshToken, setUserData } from "../slices/authSlice";
import { refreshTokenSuccess, refreshTokenFail } from "../slices/authSlice";

const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;

export const initializeAuth = () => async (dispatch) => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  const refreshToken = JSON.parse(localStorage.getItem("profile"))?.refreshToken;

  if (accessToken && refreshToken) {
    if (isValidToken(accessToken)) {
      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
      dispatch(setUserData(JSON.parse(localStorage.getItem("profile")).userData));
    } else {
      await dispatch(refreshTokenAction(refreshToken));
    }
  }
};

export const refreshTokenAction = (refreshToken) => async (dispatch) => {
  try {
    const response = await axios.post(import.meta.env.VITE_REACT_APP_REFRESH_TOKEN_LOCALHOST_URL, {
      refreshToken,
    },
    {
        headers: { 
            'content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
         }
    })
    
    const profile = JSON.parse(localStorage.getItem("profile"));
    const payload = response.data;
    localStorage.setItem("profile", JSON.stringify({ ...profile, ...payload }));
    dispatch(refreshTokenSuccess(payload));
  } catch (error) {
    localStorage.removeItem("profile");
    dispatch(refreshTokenFail());
  }
};