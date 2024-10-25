import {useSpring, animated} from '@react-spring/web';
import {useState} from 'react';

import SearchIcon from '../../../assets/svg/search-icon.svg';

import {SEARCH_ICON_ALTERNATE_LABEL} from '../../../constants/alternate-labels';

import styles from '../../../styles/SearchBarInput.module.css';

const SearchBarInput = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [divSprings, divApi] = useSpring(() => ({ width: '2rem' }));
    const [inputSprings, inputApi] = useSpring(() => ({ display:'none' }));

    const show = () => {
        divApi.start({ width: '20rem' });
        inputApi.start({ display: 'block'});
        setIsOpen(true);
    }

    const hide = () => {
        divApi.start({ width: '2rem' });
        inputApi.start({ display:'none' });
        setIsOpen(false);
    }
    
    return (
        <animated.div style={divSprings} className={styles['search-bar-input']}>
            <animated.input style={inputSprings} className={styles.input}/>
            <div className={styles.btn} onClick={isOpen ? hide : show}>
                <img className={styles.icon} src={SearchIcon} alt={SEARCH_ICON_ALTERNATE_LABEL}/>
            </div>
        </animated.div>);
}

export default SearchBarInput;