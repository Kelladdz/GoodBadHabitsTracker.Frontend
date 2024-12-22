import { CHECK_ICON_ALTERNATE_LABEL, CANCEL_ICON_ALTERNATE_LABEL } from '../../constants/alternate-labels';

import CrossIcon from '../../assets/svg/cancel-icon.svg'
import CheckIcon from '../../assets/svg/green-check-icon.svg'

import styles from '../../styles/PasswordRequirement.module.css';
const PasswordRequirement = ({requirment, isValid}) => {
    return (
        <div className={styles.requirment}>
            <img src={isValid ? CheckIcon : CrossIcon} alt={isValid ? CHECK_ICON_ALTERNATE_LABEL : CANCEL_ICON_ALTERNATE_LABEL} />
            {requirment}
        </div>)
}
export default PasswordRequirement;