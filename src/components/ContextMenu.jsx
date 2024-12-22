import React, {useContext, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeGroup, fillForm, 
    fillProgressLoggingForm, useAddToGroupMutation, useUpdateDayResultMutation, useFetchGroupsQuery } from '../store';

import ContextMenuContext from '../context/context-menu';
import LeftBarContext from '../context/left-bar';
import ModalsContext from '../context/modals';
import HabitCreatorContext from '../context/habit-creator';
import HabitContext from '../context/habit';
import CalendarContext from '../context/calendar';
import GroupsContext from '../context/groups';
import ProgressLoggerContext from '../context/progress-logger';

import ProgressLogger from './home/middle-section/ProgressLogger';

import { CONTEXT_MENU_TYPES } from '../constants/context-menu-types';
import { MODAL_TYPES } from '../constants/modal-types';
import { CREATOR_TYPES } from '../constants/creator-types';
import { LEFT_BAR_BUTTON_LABELS } from '../constants/button-labels';

import styles from '../styles/ContextMenu.module.css';

const ContextMenu = React.forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const {activeMenu, hideContextMenu} = useContext(ContextMenuContext);
    const {toggleEditModeToGroup, toggleOrder, order, toggleActiveGroup, activeGroup} = useContext(LeftBarContext)
    const {toggleModal} = useContext(ModalsContext);
    const {toggleCreator, toggleEditor} = useContext(HabitCreatorContext);
    const {activeHabit, addResultToStatistics} = useContext(HabitContext);
    const currentDateString = useSelector(state => state.calendar.currentDate).toISOString().substring(0, 10);
    
    const {toggleProgressLogger, isProgressLoggerOpen} = useContext(ProgressLoggerContext);


    const [isGroupsListOpen, setIsGroupsListOpen] = useState(false);
    const {data, error, isLoading} = useFetchGroupsQuery(undefined, {skip: !isGroupsListOpen}) || [];
    const [updateDayResult, {isLoading: isDoneLoading}] = useUpdateDayResultMutation(); 
    const [addToGroup, {isLoading: isAddToGroupLoading}] = useAddToGroupMutation();

    

    const handleResultClick = async (number) => {
        const currentDateResult = activeHabit.habit.dayResults.find(result => result.date === currentDateString);
        let request;

        if (activeHabit.habit.habitType !== 2){
            request = {
                habitId: activeHabit.habit.id,
                id: currentDateResult.id,
                progress: number === 0 ? activeHabit.habit.quantity : currentDateResult.progress,
                status: number
            }
        } else {
            request = {
                habitId: activeHabit.habit.id,
                id: currentDateResult.id,
                status: number
            }
        }
        
        try {
            await updateDayResult({habitId: activeHabit.habit.id, id: currentDateResult.id, progress: number === 0 ? activeHabit.habit.quantity : currentDateResult.progress, status: number})
            addResultToStatistics(number);
                                        
        } catch (error) {
            throw new Error(error);
        } finally {
            hideContextMenu();
        }
    }

    const handleLogProgressButtonClick = () => {
        toggleProgressLogger(true);
        const currentDateResult = activeHabit.habit.dayResults.find(result => result.date === currentDateString);

        const progress = currentDateResult ? (activeHabit.habit.isTimeBased ? currentDateResult.progress / 60 : currentDateResult.progress) : 0;
        const status = currentDateResult ? currentDateResult.status : 3;
        const date = currentDateResult ? currentDateResult.date : currentDateString;
        dispatch(fillProgressLoggingForm({progress, status, date}));

    }

    const handleHabitEditButtonClick = () => {
        hideContextMenu();
        toggleEditor(CREATOR_TYPES.goodHabit);
        dispatch(fillForm(activeHabit.habit));
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
        await addToGroup({habitId: activeHabit.habit.id, groupId: id}).unwrap();
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
                        <li className={styles.item} onClick={handleHabitDeleteButtonClick}>Delete</li>
                        <li className={styles.item} onClick={handleAddHabitToGroupButtonClick}>Move to group</li>
                    </ul>
                );
            case CONTEXT_MENU_TYPES.failedHabit:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={handleUndoButtonClick}>Undo Fail</li>
                        <li className={styles.item} onClick={handleLogProgressButtonClick}>Log progress</li>
                        <li className={styles.item} onClick={handleHabitEditButtonClick}>Edit</li>
                        <li className={styles.item} onClick={handleHabitDeleteButtonClick}>Delete</li>
                        <li className={styles.item} onClick={handleAddHabitToGroupButtonClick}>Move to group</li>
                    </ul>
                );
            case CONTEXT_MENU_TYPES.skippedHabit:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={handleUndoButtonClick}>Undo Skip</li>
                        <li className={styles.item} onClick={handleLogProgressButtonClick}>Log progress</li>
                        <li className={styles.item} onClick={handleHabitEditButtonClick}>Edit</li>
                        <li className={styles.item} onClick={handleHabitDeleteButtonClick}>Delete</li>
                        <li className={styles.item} onClick={handleAddHabitToGroupButtonClick}>Move to group</li>
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
                            {isGroupsListOpen && data && data.length > 0 &&
                        <ul className={styles.groups}>
                            {data.map(group => 
                            <li key={group.group.id} className={styles.group} onClick={() => handleDestinationGroupClick(group.group.id)}>{group.group.name}</li>)}
                        </ul>}
                        </div>
                        
                    </>
                    :
                    <div style={{left: activeMenu.position.x, top: activeMenu.position.y}} className={styles['progress-logger-box']}>
                        <ProgressLogger />
                    </div>}
            </div>  
    );
})

export default ContextMenu;