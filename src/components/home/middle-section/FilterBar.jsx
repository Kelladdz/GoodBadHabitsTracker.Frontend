import FilterBarDropdown from './FilterBarDropdown';
import SearchBarButton from './SearchBarButton';
import AddHabitDropdown from './AddHabitDropdown';

import { FILTER_BAR_BUTTON_LABELS } from '../../../constants/button-labels';

import styles from '../../../styles/FilterBar.module.css';


const FilterBar = () => {
    return (
        <div className={styles['filter-bar']}>
            <div className={styles['group-name-box']}>
                <span className={styles['group-name']}>Group 1</span>
            </div>
            <div className={styles['r-side']}>
                <SearchBarButton onClick={() => console.log('Search button clicked')}/>
                <FilterBarDropdown label='Today'/>
                <FilterBarDropdown label={FILTER_BAR_BUTTON_LABELS.sortBy}/>
                <AddHabitDropdown/>
            </div> 
        </div>
    );
}

export default FilterBar;