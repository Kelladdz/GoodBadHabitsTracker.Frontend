import { useContext, useEffect, useState } from 'react';

import Caret from '../../../assets/svg/caret.svg';


import { CARET_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import styles from '../../../styles/FilterBarDropdown.module.css';
import FilterBarContext from '../../../context/filter-bar';

const FilterBarDropdown = ({icon, alt, label, content, onClick}) => {
    const {isSearchBarOpen} = useContext(FilterBarContext);

    const wrappedClass = isSearchBarOpen ? 'wrapped-' : '';

    useEffect(() => {
        if (!isSearchBarOpen) {
            
        }
    }, [isSearchBarOpen]);
    
    return (
        <div style={{position: 'relative'}}>
            <button className={styles[`${wrappedClass}filter-bar-dropdown`]} onClick={onClick}>
                {!isSearchBarOpen ? 
                <>
                    <span className={styles[`${wrappedClass}label`]}>{label}</span>
                    <img className={styles[`${wrappedClass}icon`]} src={Caret} alt={CARET_ALTERNATE_LABEL}/>
                </>
                 :
                <img className={styles.icon} src={icon} alt={alt}/>}
            </button>
            <div className={styles['dropdown-content']}>
                {content}
            </div>
        </div>
        
    );
}

export default FilterBarDropdown;