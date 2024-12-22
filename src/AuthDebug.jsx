import { useSelector } from "react-redux";


import styles from "./styles/AuthDebug.module.css";
import { useLocation } from "react-router-dom";

export const AuthDebug = () => {
    const location = useLocation();
    const authSlice = useSelector(state => state.auth);
    const registerSlice = useSelector(state => state.register);

    if (location.pathname.endsWith('/auth')) {
        return (
            <div className={styles['debug-window']}>
                <span>Sign In Error: {authSlice.signInError}</span>
                <span>Sign Up Error: {authSlice.signUpError.length > 0 && authSlice.signUpError.map(err => JSON.stringify(err))}</span>
            </div>
        )
    } else if (location.pathname.endsWith('/auth/signup')) {
    return (
        <div className={styles['debug-window']}>
            <span>User Name: {registerSlice.userName}</span>
            <span>User Name Error: {registerSlice.userNameError}</span>
            <span>Email: {registerSlice.email}</span>
            <span>Email Error: {registerSlice.emailError}</span>
            <span>Password: {registerSlice.password}</span>
            <span>Password Error: {registerSlice.passwordError}</span>
            <span>Confirm Password: {registerSlice.confirmPassword}</span>
            <span>Confirm Password Error: {registerSlice.confirmPasswordError}</span>
            <span>Sign In Error: {authSlice.signInError}</span>
            <span>Sign Up Error: {authSlice.signUpError.length > 0 && authSlice.signUpError.map(err => JSON.stringify(err))}</span>
        </div>
    );
}
}

export default AuthDebug;