import styles from '../../styles/AuthErrorBox.module.css';

const AuthErrorBox = ({ error }) => {
    return (
        <div className={styles['auth-error-box']}>
            {error && <span className={styles['error-text']}>{error}</span>}
        </div>)
}

export default AuthErrorBox;