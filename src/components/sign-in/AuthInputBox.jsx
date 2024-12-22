import styles from '../../styles/AuthInputBox.module.css';

const AuthInputBox = ({icon, inputValue, onChange, placeholder, type, autoComplete, name}) => {
    return (
        <div className={styles['auth-input-box']}>
			<img className={styles.icon} src={icon}></img>
			<input autoComplete= {autoComplete} name={name} type={type} className={styles.input} value={inputValue} onChange={onChange} placeholder={placeholder} />
		</div>
    )
}

export default AuthInputBox;