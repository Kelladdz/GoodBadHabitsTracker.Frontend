import {useContext, useRef, useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {useSpring, animated} from '@react-spring/web';

import FilterBarContext from '../../../context/filter-bar';
import CalendarContext from '../../../context/calendar';

import SearchIcon from '../../../assets/svg/search-icon.svg';

import {SEARCH_ICON_ALTERNATE_LABEL} from '../../../constants/alternate-labels';

import styles from '../../../styles/SearchBarInput.module.css';

const SearchBarInput = () => {
    const {isSearchBarOpen, toggleSearchBar, searchString, changeSearchString} = useContext(FilterBarContext);
    
    const ref = useRef(null);
    const inputRef = useRef(null);

    const [inputValue, setInputValue] = useState('');
    const [divSprings, divApi] = useSpring(() => ({ width: '2rem' }));

    const show = () => {
        divApi.start({ width: '15rem' });
        toggleSearchBar(true);
    }

    const hide = () => {
        if (searchString.length === 0) {
            divApi.start({ width: '2rem' });
            toggleSearchBar(false);
        }
    }

    const handleClickOutsideSearchInput = (e) => {
        console.log(inputRef)
        if (ref.current && !ref.current.contains(e.target) && inputRef.current.value.length === 0) {
             hide();
        }
    }

    const handleInputChange = (e) => {
        changeSearchString(e.target.value);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideSearchInput);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideSearchInput);
        }
    },[]);
    
    return (
        <animated.div ref={ref} style={divSprings} className={styles['search-bar-input']}>
            <input ref={inputRef} value={searchString} onChange={handleInputChange} className={styles.input} />
            <div className={styles.btn} onClick={isSearchBarOpen ? hide : show}>
                <img className={styles.icon} src={SearchIcon} alt={SEARCH_ICON_ALTERNATE_LABEL}/>
            </div>
        </animated.div>);
}

export default SearchBarInput;