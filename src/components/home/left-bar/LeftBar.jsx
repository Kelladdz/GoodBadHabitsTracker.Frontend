import { useContext, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import LeftBarContext from '../../../context/left-bar';

import { useAuth } from '../../../hooks/useAuth';

import LeftBarButton from './LeftBarButton';
import GroupList from './GroupList';
import AddGroupInput from './AddGroupInput';

import AllHabitsIcon from '../../../assets/svg/all-habits-icon.svg';
import BadHabitsIcon from '../../../assets/svg/bad-habits-icon.svg';
import LogoutIcon from '../../../assets/svg/logout-icon.svg';

import { ALL_HABITS_ICON_ALTERNATE_LABEL, GOOD_HABITS_ICON_ALTERNATE_LABEL, BAD_HABITS_ICON_ALTERNATE_LABEL, LOGOUT_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';
import { LEFT_BAR_BUTTON_LABELS } from '../../../constants/button-labels';
import { CONTEXT_MENU_TYPES } from '../../../constants/context-menu-types';

import styles from '../../../styles/LeftBar.module.css';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../../store/actions/authActions';

const LeftBar = () => {
    const dispatch = useDispatch();
    const {activeGroup, toggleActiveGroup, order, toggleOrder} = useContext(LeftBarContext)
    const [activeDivSprings, activeDivApi] = useSpring(() => ({top: '0.5rem', config: {duration: 100}}));  
    

    
    const handleLeftBarButtonClick = (label) => {
        toggleOrder(null);
        toggleActiveGroup(label);
    }

    const handleLogoutClick = () => {
        dispatch(logoutAction())
    }
    
    useEffect(() => {
        if (order) {
            const translateDistance = 12.75 + ((order - 1) * 2.75);
            console.log(order)
            console.log('translateDistance', translateDistance)
            activeDivApi.start({top: `${translateDistance}rem`});    
        }
    },[order])

    useEffect(() => {
        if (activeGroup) {
            switch (activeGroup) {
                case LEFT_BAR_BUTTON_LABELS.allHabits:
                    activeDivApi.start({top: '0.5rem'});    
                    break;
                case LEFT_BAR_BUTTON_LABELS.badHabits:
                    activeDivApi.start({top: '3.25rem'});
                    break;
                case LEFT_BAR_BUTTON_LABELS.goodHabits:
                    activeDivApi.start({top: '6rem'});
                    break;
                default:
                    break
            }
        }
    },[activeGroup])
    
    return (
        <div className={styles['left-bar']}>
            <animated.div style={activeDivSprings} className={styles['active-rectangle']}></animated.div>
            <nav className={styles['habit-types-btns']}>
                <LeftBarButton 
                handleLeftBarButtonClick={() => handleLeftBarButtonClick(LEFT_BAR_BUTTON_LABELS.allHabits)}
                    style={{transform: 'translateY(-1px)'}}
                    icon={AllHabitsIcon} 
                    alt={ALL_HABITS_ICON_ALTERNATE_LABEL} 
                    label={LEFT_BAR_BUTTON_LABELS.allHabits} 
                    contextMenuType={CONTEXT_MENU_TYPES.none}/>
                <LeftBarButton 
                handleLeftBarButtonClick={() => handleLeftBarButtonClick(LEFT_BAR_BUTTON_LABELS.badHabits)}
                    icon={BadHabitsIcon} 
                    alt={BAD_HABITS_ICON_ALTERNATE_LABEL} 
                    label={LEFT_BAR_BUTTON_LABELS.badHabits} 
                    contextMenuType={CONTEXT_MENU_TYPES.badHabits}/>
                <LeftBarButton 
                handleLeftBarButtonClick={() => handleLeftBarButtonClick(LEFT_BAR_BUTTON_LABELS.goodHabits)}
                    style={{transform: 'rotate(180deg) scale(1.25) translateY(3px)'}}
                    icon={BadHabitsIcon} 
                    alt={GOOD_HABITS_ICON_ALTERNATE_LABEL} 
                    label={LEFT_BAR_BUTTON_LABELS.goodHabits} 
                    contextMenuType={CONTEXT_MENU_TYPES.goodHabits}/>
            </nav>
            <GroupList />
            <AddGroupInput />
            <div className={styles['logout-btn']}>
            <LeftBarButton 
                handleLeftBarButtonClick={() => handleLogoutClick()}
                    style={{transform: 'rotate(180deg) scale(1.25) translateY(3px)'}}
                    icon={LogoutIcon} 
                    alt={GOOD_HABITS_ICON_ALTERNATE_LABEL} 
                    label={LEFT_BAR_BUTTON_LABELS.logout} 
                    contextMenuType={CONTEXT_MENU_TYPES.none}/>
            </div>
        </div>
    )
}

export default LeftBar;