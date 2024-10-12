import Caret from '../../../assets/svg/caret.svg';

import { CARET_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import styles from '../../../styles/HabitsAccordion.module.css';

const HabitsAccordion = ({type, isOpen}) => {
    return (
        <div className={styles['habits-accordion']} >
            <span className={styles.label}>{type} Habits</span>
            <img style={isOpen && {transform: 'rotate(180deg)'}} className={styles.icon} src={Caret} alt={CARET_ALTERNATE_LABEL}/>
        </div>
    )
}

export default HabitsAccordion;