import { LeftBarProvider } from '../../context/left-bar';

import LeftBar from './left-bar/LeftBar';
import MiddleSection from './middle-section/MiddleSection';
import RightSection from './right-section/RightSection';

import styles from '../../styles/MainSection.module.css'

const MainSection = () => {
    return (
        <div className={styles['main-section']}>
            <LeftBar/>
            <div className={styles.content}>
                <MiddleSection/>
                <RightSection name='Good habit'/>
            </div>
        </div>
    );
}

export default MainSection;