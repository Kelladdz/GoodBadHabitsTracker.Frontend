import styles from '../../../styles/LeftBarButton.module.css';

const LeftBarButton = ({style, icon, alt, label, onClick}) => {
    return (
        <button className={styles['left-bar-button']} onClick={onClick}>
            <div className={styles['icon-box']}>
                <img className={styles.icon} style={style} src={icon} alt={alt}/>
            </div>
            <span className={styles.label}>{label}</span>
        </button>
        
    );
}

export default LeftBarButton;