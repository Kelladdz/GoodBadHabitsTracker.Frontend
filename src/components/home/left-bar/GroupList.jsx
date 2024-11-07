import Lottie from 'lottie-react';

import { useFetchGroupsQuery } from '../../../store';

import GroupButton from './GroupButton';

import loadingAnimationData from '../../../assets/animations/loading-animation.json';

import styles from '../../../styles/GroupList.module.css';

const GroupList = () => {
    const {data, error, isLoading} = useFetchGroupsQuery() || [];

    return (
        <div className={styles['group-list']}>
            <span className={styles.label}>Groups</span>
            <nav className={styles.btns}>
                {data ? data.map((group, index) => <GroupButton key={group.entity.id} order={index + 1} group={group.entity} />) : <Lottie animationData={loadingAnimationData} />}
            </nav>
            
        </div>
    )
}

export default GroupList;