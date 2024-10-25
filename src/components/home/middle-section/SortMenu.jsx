import styles from '../../../styles/SortMenu.module.css';

const SortMenu = React.forwardRef((props, ref) => {
    return (
        <ul ref={ref} className={styles['sort-menu']}>
            <li className={styles.item}>Sort by name</li>
            <li className={styles.item}>Sort by date</li>
            <li className={styles.item}>Custom order</li>
        </ul>
    )
});

export default SortMenu;