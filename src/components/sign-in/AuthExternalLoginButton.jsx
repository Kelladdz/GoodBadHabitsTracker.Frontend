import styles from '../../styles/AuthExternalLoginButton.module.css';

const AuthExternalLoginButton = ({onClick, icon}) => {
    return (
        <a className={styles['sign-in-btn']} onClick={onClick}>
            <img className={styles['external-icon']} src={icon} />
        </a>)
}

export default AuthExternalLoginButton;