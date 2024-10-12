import LeftArrow from '../../../assets/svg/arrow-left.svg';
import RightArrow from '../../../assets/svg/arrow-right.svg';

import { LEFT_ARROW_ALTERNATE_LABEL, RIGHT_ARROW_ALTERNATE_LABEL } from '../../../constants/alternate-labels';
import { DAYS_OF_WEEK } from '../../../constants/days-of-week';
import { MONTHS } from '../../../constants/months';

import styles from '../../../styles/Calendar.module.css';

const Calendar = () => {
    console.log(new Date());
    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <img className={styles.arrow} src={LeftArrow} alt={LEFT_ARROW_ALTERNATE_LABEL}/>
                <span className={styles['current-month-box']}>{MONTHS[new Date().getMonth()]} {new Date().getFullYear()}</span>
                <img className={styles.arrow} src={RightArrow} alt={RIGHT_ARROW_ALTERNATE_LABEL}/>
            </div>
            <div className={styles['days-of-week']}>
                {DAYS_OF_WEEK.map((day, index) => 
                <div className={styles['day-of-week-box']}>
                    <span key={index} className={styles['day-of-week']}>{day}</span>
                </div>)}
            </div>
            <div className={styles['days-of-month']}>
                {Array.from({ length: 35 }, (_, i) => (
                <div className={styles['day-of-month-box']}>
                    <span key={i} className={styles['day-of-month']}>0</span>
                </div>))}
            </div>
        </div>  
    )
}

export default Calendar;