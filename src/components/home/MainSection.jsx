import styles from '../../styles/MainSection.module.css'
import LeftBar from './left-bar/LeftBar';
import MiddleSection from './middle-section/MiddleSection';
import RightSection from './right-section/RightSection';

const MainSection = () => {
    return (
        <div className={styles.container}>
            <LeftBar/>
            <MiddleSection/>
            <RightSection name='Good habit'/>
        </div>
    );
}

export default MainSection;