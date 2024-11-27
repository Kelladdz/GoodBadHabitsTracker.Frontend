import styles from '../../../styles/SettingsButton.module.css';

const SettingsButton = ({onClick, label}) => {
    return (
        <button className={styles.btn} onClick={onClick}>
            <span className={styles.label}>{label}</span>
        </button>
    )
}

export default SettingsButton;