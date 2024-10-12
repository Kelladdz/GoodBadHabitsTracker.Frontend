import SearchIcon from '../../../assets/svg/search-icon.svg';

import {SEARCH_ICON_ALTERNATE_LABEL} from '../../../constants/alternate-labels';

import styles from '../../../styles/SearchBarButton.module.css';

const SearchBarButton = ({onClick}) => {
    return (
        <button className={styles['search-bar-button']} onClick={onClick}>
            <img className={styles.icon} src={SearchIcon} alt={SEARCH_ICON_ALTERNATE_LABEL}/>
        </button>);
}

export default SearchBarButton;