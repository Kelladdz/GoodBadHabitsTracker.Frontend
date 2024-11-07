import React from 'react';

import { HABIT_ICONS_URLS } from '../../../constants/habit-icons';
import { HABIT_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import styles from '../../../styles/CreatorIconsGrid.module.css';

export const CreatorIconsGrid = React.forwardRef(({props, handleIconClick}, ref) => {
    return (
        <div ref={ref} className={styles['creator-icons-grid']}>
            {HABIT_ICONS_URLS.map((url, index) => {
            return <div className={styles['icon-box']} onClick={() => handleIconClick(index)}>
                <img className={styles.icon} src={url} alt={HABIT_ICON_ALTERNATE_LABEL}/>
            </div>})}
        </div>
    );
})

export default CreatorIconsGrid;