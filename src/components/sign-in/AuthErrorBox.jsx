import styles from '../../styles/AuthErrorBox.module.css';

const AuthErrorBox = ({ errors }) => {
    return (
        <div className={styles['auth-error-box']}>
            {errors && <span className={styles['error-text']}>{errors}</span>}
        </div>)
}

export default AuthErrorBox;