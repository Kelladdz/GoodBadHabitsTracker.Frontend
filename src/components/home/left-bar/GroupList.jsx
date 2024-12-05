import Lottie from 'lottie-react';

import { useFetchGroupsQuery } from '../../../store/api/groupsApi';

import GroupButton from './GroupButton';

import loadingAnimationData from '../../../assets/animations/loading-animation.json';

import styles from '../../../styles/GroupList.module.css';
import { useSelector } from 'react-redux';

const GroupList = () => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const {data, error, isLoading} = useFetchGroupsQuery() || [];

    return (
        <div className={styles['group-list']}>
            <span className={styles.label}>Groups</span>
            <nav className={styles.btns}>
                {!isLoading && data ? data.map((group, index) => <GroupButton key={group.id} order={index + 1} group={group.group} />) : <Lottie animationData={loadingAnimationData} />}
            </nav>
            
        </div>
    )
}

export default GroupList;