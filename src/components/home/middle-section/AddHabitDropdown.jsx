import { PLUS_SIGN_ALTERNATE_LABEL, CARET_ALTERNATE_LABEL } from '../../../constants/alternate-labels';
import { FILTER_BAR_BUTTON_LABELS } from '../../../constants/button-labels';

import PlusSign from '../../../assets/svg/plus-sign.svg';
import WhiteCaret from '../../../assets/svg/caret-white.svg';

import styles from '../../../styles/AddHabitDropdown.module.css';

const AddHabitDropdown = () => {
    return(
        <button className={styles['add-habit-dropdown']} onClick={() => console.log('Add button clicked')}>
            <img className={styles.icon} src={PlusSign} alt={PLUS_SIGN_ALTERNATE_LABEL}/>
            <span className={styles.label}>{FILTER_BAR_BUTTON_LABELS.addHabit}</span>
            <img className={styles.icon} src={WhiteCaret} alt={CARET_ALTERNATE_LABEL}/>
        </button>);
}

export default AddHabitDropdown;