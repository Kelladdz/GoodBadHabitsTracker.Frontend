import { useContext } from 'react';

import FilterBarContext from '../../../context/filter-bar';

import styles from '../../../styles/SortMenu.module.css';

const SortMenu = React.forwardRef((props, ref) => {
    const {changeOrderOption} = useContext(FilterBarContext)

    return (
        <ul ref={ref} className={styles['sort-menu']}>
            <li className={styles.item} onClick={() => changeOrderOption(1)}>Sort by name ascending</li>
            <li className={styles.item} onClick={() => changeOrderOption(2)}>Sort by name descending</li>
        </ul>
    )
});

export default SortMenu;