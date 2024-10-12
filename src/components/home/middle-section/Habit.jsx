import HabitIcon from './HabitIcon';
import HabitInfo from './HabitInfo';
import HabitButton from './HabitButton';

import CheckIcon from '../../../assets/svg/check-icon.svg';
import ThreeDots from '../../../assets/svg/three-dots.svg';

import { CHECK_ICON_ALTERNATE_LABEL, THREE_DOTS_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import styles from '../../../styles/Habit.module.css';

const Habit = ({name, progress, quantity, icon}) => {
    return (
        <div className={styles.habit}>
            <div className={styles.info}>
                <HabitIcon icon={icon}/>
                <HabitInfo name={name} progress={progress} quantity={quantity}/>
            </div>
            <div className={styles.btns}>
                <HabitButton>
                    <img className={styles.icon} src={CheckIcon} alt={CHECK_ICON_ALTERNATE_LABEL}/>
                    <span className={styles['btn-label']}>Done</span>
                </HabitButton>
                <HabitButton>
                    <img className={styles.icon} src={ThreeDots} alt={THREE_DOTS_ALTERNATE_LABEL}/>
                </HabitButton>
            </div>
        </div>
    )
}

export default Habit;