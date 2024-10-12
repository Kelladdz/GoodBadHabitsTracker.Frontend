import PlusSign from '../../../assets/svg/black-plus-sign.svg';

import { PLUS_SIGN_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import styles from '../../../styles/AddGroupInput.module.css';

const AddGroupInput = () => {
    return (
        <div className={styles['add-group-input']} onClick={console.log('Add group button clicked')}>
            <div className={styles['icon-box']}>
                <img className={styles.icon} src={PlusSign} alt={PLUS_SIGN_ALTERNATE_LABEL}/>
            </div>
            <span className={styles.label}>Add Group</span>
        </div>
    )
}

export default AddGroupInput;