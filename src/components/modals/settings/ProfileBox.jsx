import { PROFILE_IMAGE_ALTERNATE_LABEL, EDIT_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import QuestionMark from '../../../assets/svg/question-mark.svg';
import EditIcon from '../../../assets/svg/edit-icon.svg';

import styles from '../../../styles/ProfileBox.module.css';

const ProfileBox = () => {
    return (
            <div className={styles['profile-box']}>
                <img className={styles.image} src={QuestionMark} alt={PROFILE_IMAGE_ALTERNATE_LABEL}/>
                <div className={styles['rename-btn']}>
                    <img src={EditIcon} alt={EDIT_ICON_ALTERNATE_LABEL}/>
                </div>
                
            </div>
    )
}

export default ProfileBox;