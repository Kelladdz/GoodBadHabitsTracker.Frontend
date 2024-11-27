import React, { useContext } from 'react';

import { FilterBarProvider } from '../../context/filter-bar';

import HabitContext from '../../context/habit';

import LeftBar from './left-bar/LeftBar';
import MiddleSection from './middle-section/MiddleSection';
import RightSection from './right-section/RightSection';

import styles from '../../styles/MainSection.module.css'
import { ChartProvider } from '../../context/chart';

const MainSection = () => {
    const {activeHabit} = useContext(HabitContext);
    return (
        <div className={styles['main-section']}>
            <LeftBar/>
            <div className={styles.content}>
                <FilterBarProvider>
                    <MiddleSection/>
                </FilterBarProvider>
                {activeHabit && <ChartProvider><RightSection/></ChartProvider>}
            </div>
        </div>
    );
}

export default MainSection;