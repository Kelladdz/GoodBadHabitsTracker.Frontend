import React, {useContext, useState} from 'react';

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
import { changeGroup, fillForm, fillProgressLoggingForm, useAddToGroupMutation, useUpdateDayResultMutation } from '../store';
import HabitContext from '../context/habit';
import CalendarContext from '../context/calendar';
import ProgressLogger from './home/middle-section/ProgressLogger';
import GroupsContext from '../context/groups';
import ProgressLoggerContext from '../context/progress-logger';

const ContextMenu = React.forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const {activeMenu, hideContextMenu} = useContext(ContextMenuContext);
    const {toggleEditModeToGroup, toggleOrder, order, toggleActiveGroup, activeGroup} = useContext(LeftBarContext)
    const {toggleModal} = useContext(ModalsContext);
    const {toggleCreator} = useContext(HabitCreatorContext);
    const {activeHabit} = useContext(HabitContext);
    const {currentDateString} = useContext(CalendarContext)
    const {groups} = useContext(GroupsContext);
    const {toggleProgressLogger, isProgressLoggerOpen} = useContext(ProgressLoggerContext);

    const currentDateResult = activeHabit.dayResults.find(result => result.date === currentDateString);

    const [updateDayResult, {isLoading: isDoneLoading}] = useUpdateDayResultMutation(); 
    const [addToGroup, {isLoading: isAddToGroupLoading}] = useAddToGroupMutation();

    const [isGroupsListOpen, setIsGroupsListOpen] = useState(false);

    const handleResultClick = async (number) => {
        const dayResultIndex = activeHabit.dayResults.findIndex(result => result.date === currentDateString);
        await updateDayResult({id: activeHabit.id, index: dayResultIndex, date: currentDateString, progress: number === 0 ? activeHabit.quantity : currentDateResult.progress, status: number})
    }

    const handleLogProgressButtonClick = () => {
        toggleProgressLogger(true);

        const progress = currentDateResult ? currentDateResult.progress : 0;
        const status = currentDateResult ? currentDateResult.status : 3;
        const date = currentDateResult ? currentDateResult.date : currentDateString;
        dispatch(fillProgressLoggingForm({progress, status, date}));
    }

    const handleHabitEditButtonClick = () => {
        hideContextMenu();
        toggleCreator(CREATOR_TYPES.goodHabit);
        dispatch(fillForm(activeHabit));
    }

    const handleHabitDeleteButtonClick = () => {
        hideContextMenu();
        toggleModal(MODAL_TYPES.deleteHabit);
    }

    const handleAddHabitToGroupButtonClick = () => {
        setIsGroupsListOpen(true);
    }

    const handleDestinationGroupClick = async (id) => {
        hideContextMenu();
        await addToGroup({habitId: activeHabit.id, groupId: id}.unwrap());
    }

    const handleUndoButtonClick = () => {
        hideContextMenu();
        toggleModal(MODAL_TYPES.undo);
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
                        <li className={styles.item} onClick={() => handleResultClick(1)}>Fail</li>
                        <li className={styles.item} onClick={() => handleResultClick(2)}>Skip</li>
                        <li className={styles.item} onClick={handleLogProgressButtonClick}>Log progress</li>
                        <li className={styles.item} onClick={handleHabitEditButtonClick}>Edit</li>
                        <li className={styles.item} onClick={handleHabitDeleteButtonClick}>Delete</li>
                        <li className={styles.item} onClick={handleAddHabitToGroupButtonClick}>Move to group</li>
                    </ul>
                );
            case CONTEXT_MENU_TYPES.completedHabit:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={handleUndoButtonClick}>Undo Complete</li>
                        <li className={styles.item} onClick={handleLogProgressButtonClick}>Log progress</li>
                        <li className={styles.item} onClick={handleHabitEditButtonClick}>Edit</li>
                    </ul>
                );
            case CONTEXT_MENU_TYPES.failedHabit:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={handleUndoButtonClick}>Undo Fail</li>
                        <li className={styles.item} onClick={handleLogProgressButtonClick}>Log progress</li>
                        <li className={styles.item} onClick={handleHabitEditButtonClick}>Edit</li>
                    </ul>
                );
            case CONTEXT_MENU_TYPES.skippedHabit:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={handleUndoButtonClick}>Undo Skip</li>
                        <li className={styles.item} onClick={handleLogProgressButtonClick}>Log progress</li>
                        <li className={styles.item} onClick={handleHabitEditButtonClick}>Edit</li>
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
        
            <div style={{position: 'relative'}}>
                {!isProgressLoggerOpen ? 
                    <>
                        <div ref={ref} style={{left: activeMenu.position.x, top: activeMenu.position.y}} className={styles['context-menu']}>
                            {list()}
                        </div>
                        {isGroupsListOpen && groups && groups.length > 0 &&
                        <ul className={styles.groups}>
                            {groups.map(group => 
                            <li key={group.id} className={styles.item} onClick={() => handleDestinationGroupClick(group.id)}>{group.name}</li>)}
                        </ul>}
                    </>
                    :
                    <div style={{left: activeMenu.position.x, top: activeMenu.position.y}} className={styles['progress-logger-box']}>
                        <ProgressLogger />
                    </div>}
            </div>
            
            
            
        
    );
})

export default ContextMenu;