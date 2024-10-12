import LeftBarButton from './LeftBarButton';
import GroupList from './GroupList';
import AddGroupInput from './AddGroupInput';

import AllHabitsIcon from '../../../assets/svg/all-habits-icon.svg';
import BadHabitsIcon from '../../../assets/svg/bad-habits-icon.svg';

import { LEFT_BAR_ICON_ALTERNATE_LABELS } from '../../../constants/alternate-labels';
import { LEFT_BAR_BUTTON_LABELS } from '../../../constants/button-labels';

import styles from '../../../styles/LeftBar.module.css'


const LeftBar = () => {
    return (
        <div className={styles['left-bar']}>
            <nav className={styles['habit-types-btns']}>
                <LeftBarButton 
                    style={{transform: 'translateY(-1px)'}}
                    icon={AllHabitsIcon} 
                    alt={LEFT_BAR_ICON_ALTERNATE_LABELS.allHabits} 
                    label={LEFT_BAR_BUTTON_LABELS.allHabits} 
                    onClick={() => console.log('All Habits button clicked')}/>
                <LeftBarButton 
                    icon={BadHabitsIcon} 
                    alt={LEFT_BAR_ICON_ALTERNATE_LABELS.badHabits} 
                    label={LEFT_BAR_BUTTON_LABELS.badHabits} 
                    onClick={() => console.log('Bad Habits button clicked')}/>
                <LeftBarButton 
                    style={{transform: 'rotate(180deg) scale(1.25) translateY(3px)'}}
                    icon={BadHabitsIcon} 
                    alt={LEFT_BAR_ICON_ALTERNATE_LABELS.goodHabits} 
                    label={LEFT_BAR_BUTTON_LABELS.goodHabits} 
                    onClick={() => console.log('Good Habits button clicked')}/>
            </nav>
            <GroupList />
            <AddGroupInput />
        </div>
    )
}

export default LeftBar;