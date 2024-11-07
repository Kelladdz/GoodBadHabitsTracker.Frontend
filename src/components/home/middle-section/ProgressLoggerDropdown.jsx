import { CARET_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import Caret from '../../../assets/svg/caret.svg';

import styles from '../../../styles/ProgressLoggerDropdown.module.css';

const ProgressLoggerDropdown = ({label, content, onClick}) => {
    return (
        <div style={{position: 'relative'}}>
            <button type='button' className={styles[`progress-logger-dropdown`]} onClick={onClick}>
                <span className={styles.label}>{label}</span>
                <img className={styles.icon} src={Caret} alt={CARET_ALTERNATE_LABEL}/>
            </button>
            <div className={styles['dropdown-content']}>
                {content}
            </div>
        </div>
    );
}

export default ProgressLoggerDropdown;