import { useSelector } from 'react-redux';

import { PROFILE_IMAGE_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import styles from '../../../styles/ProfileBox.module.css';

const ProfileBox = () => {
    const profileImage = useSelector(state => state.user.user.picture);
    const userName = useSelector(state => state.user.user.name);
    return (
            <div className={styles['profile-box']}>
                {profileImage ? 
                    <div className={styles.background}>
                        <img className={styles.image} src={profileImage} alt={PROFILE_IMAGE_ALTERNATE_LABEL}/>  
                    </div>  
                    :
                    userName[0]
                }
            </div>
    )
}

export default ProfileBox;