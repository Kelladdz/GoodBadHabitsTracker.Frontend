import { useState } from 'react';
import Caret from '../../../assets/svg/caret.svg';

import { CARET_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import styles from '../../../styles/FilterBarDropdown.module.css';

const FilterBarDropdown = ({label, content, onClick}) => {

    return (
        <div style={{position: 'relative'}}>
            <button className={styles['filter-bar-dropdown']} onClick={onClick}>
                <span className={styles.label}>{label}</span>
                <img className={styles.icon} src={Caret} alt={CARET_ALTERNATE_LABEL}/>
            </button>
            <div className={styles['dropdown-content']}>
                {content}
            </div>
        </div>
        
    );
}

export default FilterBarDropdown;