import { useContext } from 'react';

import FilterBarContext from '../../../context/filter-bar';

import { CARET_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import Caret from '../../../assets/svg/caret.svg';

import styles from '../../../styles/FilterBarDropdown.module.css';

const FilterBarDropdown = ({icon, alt, label, content, onClick}) => {
    const {isSearchBarOpen} = useContext(FilterBarContext);

    const wrappedClass = isSearchBarOpen ? 'wrapped-' : '';
    
    return (
        <div style={{position: 'relative'}}>
            <button className={styles[`${wrappedClass}filter-bar-dropdown`]} onClick={onClick}>
            <img className={styles['mobile-icon']} src={icon} alt={alt}/>
                {!isSearchBarOpen ? 
                <>
                    <span className={styles[`${wrappedClass}label`]}>{label}</span>
                    <img className={styles[`${wrappedClass}caret`]} src={Caret} alt={CARET_ALTERNATE_LABEL}/>
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