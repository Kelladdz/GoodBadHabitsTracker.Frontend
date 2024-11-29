import { useSelector } from "react-redux";


import styles from "./styles/AuthDebug.module.css";

export const AuthDebug = () => {
    const authSlice = useSelector(state => state.auth);

    return (
        <div className={styles['debug-window']}>
            <span>Access Token: {authSlice.accessToken}</span>
            <span>Refresh Token: {authSlice.refreshToken}</span>
            <span>User Data: {JSON.stringify(authSlice.userData)}</span>
            <span>Expires In: {authSlice.expiresIn}</span>
            <span>Scope: {authSlice.scope}</span>
            <span>Provider: {authSlice.provider}</span>
            <span>Is Authenticated: {authSlice.isAuthenticated ? 'True' : 'False'}</span>
            <span>Sign In Error: {authSlice.signInError}</span>
            <span>Sign Up Error: {authSlice.signUpError.length > 0 && authSlice.signUpError.map(err => JSON.stringify(err))}</span>
        </div>
    );
}

export default AuthDebug;