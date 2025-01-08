import React, { useContext } from 'react';

import { FilterBarProvider } from '../../context/filter-bar';

import HabitContext from '../../context/habit';

import LeftBar from './left-bar/LeftBar';
import MiddleSection from './middle-section/MiddleSection';
import RightSection from './right-section/RightSection';
import TimerDebugWindow from './../../TimerDebugWindow';

import styles from '../../styles/MainSection.module.css'
import { ChartProvider } from '../../context/chart';
import TimerContext from '../../context/timer';
import ModalsContext from '../../context/modals';

import {MODAL_TYPES} from './../../constants/modal-types'

const MainSection = () => {
    const {activeHabit} = useContext(HabitContext);
    const {activeModal} = useContext(ModalsContext)
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