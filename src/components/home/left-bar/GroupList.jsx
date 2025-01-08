import Lottie from 'lottie-react';
import { useTransition, animated } from 'react-spring';
import { useFetchGroupsQuery } from '../../../store/api/groupsApi';

import GroupButton from './GroupButton';

import loadingAnimationData from '../../../assets/animations/loading-animation.json';

import styles from '../../../styles/GroupList.module.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const GroupList = () => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const {data, error, isLoading} = useFetchGroupsQuery(undefined, {skip: !accessToken}) || [];

    const groupTransition = useTransition(data, {
        from: {height: '0rem', opacity: 0},
        enter: {height: '2.25rem', opacity: 1},
        leave: {height: '0rem', opacity: 0},
        config: {duration: 200}
    });

    return (
        <div className={styles['group-list']}>
            {!isLoading && data ?
            <ul className={styles.btns}>
                {groupTransition((style, group) => (
                    <animated.li  style={style} key={group.group.id}>
                         <GroupButton order={data.findIndex(g => g === group) + 1} group={group.group} />
                    </animated.li>))
                } 
            </ul> : <Lottie animationData={loadingAnimationData} />}
            
        </div>
    )
}

export default GroupList;