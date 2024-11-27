import { useSelector } from "react-redux";


import styles from "./styles/AuthDebug.module.css";

export const AuthDebug = () => {
    const userData = useSelector(state => state.auth);

    return (
        userData && <div className={styles['debug-window']}>
            <span>Access Token: {userData.accessToken}</span>
            <span>Refresh Token: {userData.refreshToken}</span>
            <span>User Fingerprint: {userData.userFingerprint}</span>
            <span>First Name: {userData.firstName}</span>
            <span>Last Name: {userData.lastName}</span>
            <span>User Name: {userData.userName}</span>
        </div>
    );
}

export default AuthDebug;