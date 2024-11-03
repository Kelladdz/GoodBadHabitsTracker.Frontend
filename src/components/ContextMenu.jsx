import React, {useContext} from 'react';

import ContextMenuContext from '../context/context-menu';

import styles from '../styles/ContextMenu.module.css';
import { CONTEXT_MENU_TYPES } from '../constants/context-menu-types';
import { MODAL_TYPES } from '../constants/modal-types';
import LeftBarContext from '../context/left-bar';
import ModalsContext from '../context/modals';
import { CREATOR_TYPES } from '../constants/creator-types';
import HabitCreatorContext from '../context/habit-creator';
import { LEFT_BAR_BUTTON_LABELS } from '../constants/button-labels';
import { useDispatch } from 'react-redux';
import { changeGroup, useAddDayResultMutation } from '../store';
import HabitContext from '../context/habit';
import CalendarContext from '../context/calendar';
import { DAY_RESULTS_STATUSES } from '../constants/habits-properties';

const ContextMenu = React.forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const {activeMenu, hideContextMenu} = useContext(ContextMenuContext);
    const {toggleEditModeToGroup, toggleOrder, order, toggleActiveGroup, activeGroup} = useContext(LeftBarContext)
    const {toggleModal} = useContext(ModalsContext);
    const {toggleCreator} = useContext(HabitCreatorContext);
    const {activeHabit} = useContext(HabitContext);
    const {currentDateString} = useContext(CalendarContext)

    const currentDayResults = activeHabit.dayResults.filter(result => result.date === currentDateString);

    const [addDayResult, {isLoading: isDoneLoading}] = useAddDayResultMutation(); 

    const handleResultClick = async (number) => {
        await addDayResult({habitId: activeHabit.id, date: currentDateString, progress: number === 0 ? habit.quantity : currentDayResults.progress, status: number});

    }

    const handleRenameButtonClick = () => {
        hideContextMenu();
        toggleEditModeToGroup();
    }

    const handleDeleteButtonClick = () => {
        hideContextMenu();
        toggleModal(MODAL_TYPES.deleteGroup);
    }

    const handleCreateGoodHabitButtonClick = () => {
        hideContextMenu();
        toggleCreator(CREATOR_TYPES.goodHabit);
    }

    const handleCreateBadHabitButtonClick = () => {
        hideContextMenu();
        toggleCreator(CREATOR_TYPES.limitHabit);
    }

    const handleManageBadHabitsButtonClick = () => {
        hideContextMenu();
        toggleOrder(null);
        toggleActiveGroup(LEFT_BAR_BUTTON_LABELS.badHabits);
    }

    const handleManageGoodHabitsButtonClick = () => {
        hideContextMenu();
        toggleOrder(null);
        toggleActiveGroup(LEFT_BAR_BUTTON_LABELS.goodHabits);
    }

    const handleCreateGoodHabitInCustomGroup = () => {
        hideContextMenu();
        toggleCreator(CREATOR_TYPES.goodHabit);
        dispatch(changeGroup(activeGroup.id));
    }

    const handleCreateBadHabitInCustomGroup = () => {
        hideContextMenu();
        toggleCreator(CREATOR_TYPES.limitHabit);
        dispatch(changeGroup(activeGroup.id));
    }

    function list() {
        switch(activeMenu.type) {
            case CONTEXT_MENU_TYPES.habit:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={() => handleResultClick(0)}>Complete</li>
                        <li className={styles.item} onClick={console.log('')}>Fail</li>
                        <li className={styles.item} onClick={console.log('')}>Skip</li>
                        <li className={styles.item} onClick={console.log('')}>Log progress</li>
                        <li className={styles.item} onClick={console.log('')}>Edit</li>
                        <li className={styles.item} onClick={console.log('')}>Delete</li>
                        <li className={styles.item} onClick={console.log('')}>Move to group</li>
                    </ul>
                );
            case CONTEXT_MENU_TYPES.completedHabit:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={console.log('')}>Undo Complete</li>
                        <li className={styles.item} onClick={console.log('')}>Log progress</li>
                        <li className={styles.item} onClick={console.log('')}>Edit</li>
                    </ul>
                );
            case CONTEXT_MENU_TYPES.failedHabit:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={console.log('')}>Undo Fail</li>
                        <li className={styles.item} onClick={console.log('')}>Log progress</li>
                        <li className={styles.item} onClick={console.log('')}>Edit</li>
                    </ul>
                );
            case CONTEXT_MENU_TYPES.skippedHabit:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={console.log('')}>Undo Skip</li>
                        <li className={styles.item} onClick={console.log('')}>Log progress</li>
                        <li className={styles.item} onClick={console.log('')}>Edit</li>
                    </ul>
                );
            case CONTEXT_MENU_TYPES.customGroup:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={handleRenameButtonClick}>Rename</li>
                        <li className={styles.item} onClick={handleDeleteButtonClick}>Delete group</li>
                        <li className={styles.item} onClick={handleCreateGoodHabitInCustomGroup}>Create good habit here</li>
                        <li className={styles.item} onClick={handleCreateBadHabitInCustomGroup}>Create bad habit here</li>
                    </ul>
                );
            case CONTEXT_MENU_TYPES.badHabits:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={handleCreateBadHabitButtonClick}>Create habit here</li>
                        <li className={styles.item} onClick={handleManageBadHabitsButtonClick}>Manage habits</li>
                    </ul>
                );
            case CONTEXT_MENU_TYPES.goodHabits:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={handleCreateGoodHabitButtonClick}>Create habit here</li>
                        <li className={styles.item} onClick={handleManageGoodHabitsButtonClick}>Manage habits</li>
                    </ul>
                );
            default:
                return null;
        }
    }

    return (
        <div ref={ref} style={{left: activeMenu.position.x, top: activeMenu.position.y}} className={styles['context-menu']}>
            {list()}
        </div>
    );
})

export default ContextMenu;