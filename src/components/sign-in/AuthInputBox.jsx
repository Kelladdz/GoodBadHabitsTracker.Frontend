import styles from '../../styles/AuthInputBox.module.css';

const AuthInputBox = ({icon, inputValue, onChange, placeholder, type}) => {
    return (
        <div className={styles['auth-input-box']}>
			<img className={styles.icon} src={icon}></img>
			<input type={type} className={styles.input} value={inputValue} onChange={onChange} placeholder={placeholder} />
		</div>
    )
}

export default AuthInputBox;