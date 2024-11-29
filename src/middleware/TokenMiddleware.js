import {jwtDecode} from "jwt-decode";
import { logout } from "../store";
import Cookies from "js-cookie";
import { refreshTokenAction } from "../store/actions/authActions";
import { PATHS } from "../constants/paths";

export const tokenMiddleware = (store) => (next) => async (action) => {
    if (action.meta && action.meta.requiresAuth) {
      const state = store.getState();
      const accessToken = state.auth?.accessToken;
      if (accessToken) {
        const expiresIn = jwtDecode(accessToken).exp;
        if (expiresIn < Date.now().valueOf() / 1000) {
          const refreshToken = state.auth.refreshToken;
          try {
            await store.dispatch(refreshTokenAction(refreshToken));
            const newToken = store.getState().auth.accessToken;
            if (!newToken) {
              throw new Error("Access token not found after refresh");
            }
          } catch (error) {
            
            store.dispatch(logout());
          }
        }
      } else {
        
        store.dispatch(logout());
      }
    }
    return next(action);
};

export default tokenMiddleware;