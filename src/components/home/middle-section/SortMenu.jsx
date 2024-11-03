import { useContext } from 'react';
import useFilter from '../../../hooks/useFilter';
import styles from '../../../styles/SortMenu.module.css';
import FilterBarContext from '../../../context/filter-bar';

const SortMenu = React.forwardRef((props, ref) => {
    const {changeOrderOption} = useContext(FilterBarContext)

    return (
        <ul ref={ref} className={styles['sort-menu']}>
            <li className={styles.item} onClick={() => changeOrderOption(1)}>Sort by name</li>
            <li className={styles.item} onClick={() => changeOrderOption(2)}>Sort by streak</li>
            <li className={styles.item} onClick={() => changeOrderOption(3)}>Custom order</li>
        </ul>
    )
});

export default SortMenu;