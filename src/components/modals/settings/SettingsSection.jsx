import styles from '../../../styles/SettingsSection.module.css';

const SettingsSection = ({title, text, children}) => {
    return (
        <div className={styles['settings-section']}>
            <div className={styles.description}>
                <span className={styles.title}>{title}</span>
                <span className={styles.text}>{text}</span>
            </div>
                
            {children}
        </div>
    )
}

export default SettingsSection;