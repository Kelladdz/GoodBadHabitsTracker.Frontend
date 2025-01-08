import axios from "axios";
import { isValidToken } from "../../utils/authUtils";
import { logout, setAccessToken, setRefreshToken, setUserData } from "../slices/authSlice";
import { refreshTokenSuccess, refreshTokenFail } from "../slices/authSlice";
import Cookies from "js-cookie";
import { PATHS } from "../../constants/paths";

const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
const idToken = JSON.parse(localStorage.getItem("profile"))?.idToken;


export const initializeAuth = () => async (dispatch) => {
  
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  const refreshToken = Cookies.get("__Secure-Rt");

  if (accessToken && refreshToken) {
    if (isValidToken(accessToken)) {
      console.log("Access token is valid");
      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
      dispatch(setUserData(JSON.parse(localStorage.getItem("profile")).userData));
    } else {
      console.log("Access token is invalid");
      refreshTokenAction(refreshToken);
    }
  }
};

export const refreshTokenAction = (refreshToken) => async (dispatch) => {
  console.log("refreshTokenAction");
  console.log(idToken);
  if (idToken === undefined) {
    try {
      const response = await axios.post(import.meta.env.VITE_REACT_APP_REFRESH_TOKEN_LOCALHOST_URL, {
        refreshToken
      },
      {
          headers: { 
              'content-type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
           },
           withCredentials: true
      })
      const profile = JSON.parse(localStorage.getItem("profile"));
      const payload = response.data;
      localStorage.setItem("profile", JSON.stringify({ ...profile, ...payload }));
      dispatch(refreshTokenSuccess(payload));
      return payload;
    } catch (error) {
      dispatch(refreshTokenFail());
    }
  } else {
    const payload = await dispatch(oauthRefreshTokenAction(refreshToken))
    return payload;
  }
};

export const oauthRefreshTokenAction = (refreshToken) => async (dispatch) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
      grantType: "refresh_token",
      clientId: import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID,
      clientSecret: import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_SECRET,
      refreshToken: refreshToken
    },
    {
        headers: { 
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${accessToken}`
         }
    })
    
    const profile = JSON.parse(localStorage.getItem("profile"));
    const payload = response.data;
    localStorage.setItem("profile", JSON.stringify({ ...profile, ...payload }));
    dispatch(refreshTokenSuccess(payload));
    return payload;
  } catch (error) {
    dispatch(refreshTokenFail());
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    await axios.post(import.meta.env.VITE_REACT_APP_LOGOUT_LOCALHOST_URL, {},
      { 
        withCredentials: true, 
        headers: { 
        'Authorization': `Bearer ${accessToken}`
      } }
      
    )
      .then(res => {
        console.log(res);
        if (res.status === 204) {
          localStorage.removeItem("profile");
          dispatch(logout());
        }
      });
  } catch (err) {
    throw Error(err)
  } finally {
    window.location.href = "https://localhost:8080/auth"
  }
  
};

