import Caret from '../../../assets/svg/caret.svg';

import { CARET_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import styles from '../../../styles/FilterBarDropdown.module.css';

const FilterBarDropdown = ({label}) => {
    return (
        <button className={styles['filter-bar-dropdown']} onClick={() => console.log('Filter bar dropdown clicked')}>
            <span className={styles.label}>{label}</span>
            <img className={styles.icon} src={Caret} alt={CARET_ALTERNATE_LABEL}/>
        </button>
    );
}

export default FilterBarDropdown;