import styles from '../../styles/AuthButton.module.css';

const AuthButton = ({type, onClick, label}) => {
    return (
        <button className={styles.btn} type={type} onClick={onClick}>
		    {label}
	    </button>)
}

export default AuthButton;