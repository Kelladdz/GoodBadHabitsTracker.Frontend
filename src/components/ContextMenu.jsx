import React, {useContext} from 'react';

import ContextMenuContext from '../context/context-menu';

import styles from '../styles/ContextMenu.module.css';
import { CONTEXT_MENU_TYPES } from '../constants/context-menu-types';
import { MODAL_TYPES } from '../constants/modal-types';
import LeftBarContext from '../context/left-bar';
import ModalsContext from '../context/modals';
import { CREATOR_TYPES } from '../constants/creator-types';
import HabitCreatorContext from '../context/habit-creator';

const ContextMenu = React.forwardRef((props, ref) => {
    const {activeMenu, hideContextMenu} = useContext(ContextMenuContext);
    const {toggleEditModeToGroup} = useContext(LeftBarContext)
    const {toggleModal} = useContext(ModalsContext);
    const {toggleCreator} = useContext(HabitCreatorContext);

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

    function list() {
        switch(activeMenu.type) {
            case CONTEXT_MENU_TYPES.habit:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item}>Complete</li>
                        <li className={styles.item}>Fail</li>
                        <li className={styles.item}>Skip</li>
                        <li className={styles.item}>Log progress</li>
                        <li className={styles.item}>Edit</li>
                        <li className={styles.item}>Delete</li>
                        <li className={styles.item}>Move to group</li>
                    </ul>
                );
            case CONTEXT_MENU_TYPES.customGroup:
                return (
                    <ul className={styles.list}>
                        <li onClick={handleRenameButtonClick} className={styles.item}>Rename</li>
                        <li onClick={handleDeleteButtonClick} className={styles.item}>Delete group</li>
                        <li className={styles.item}>Create good habit here</li>
                        <li className={styles.item}>Create bad habit here</li>
                        <li className={styles.item}>Manage habits</li>
                    </ul>
                );
            case CONTEXT_MENU_TYPES.badHabits:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={handleCreateBadHabitButtonClick}>Create habit here</li>
                        <li className={styles.item}>Manage habits</li>
                    </ul>
                );
            case CONTEXT_MENU_TYPES.goodHabits:
                return (
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={handleCreateGoodHabitButtonClick}>Create habit here</li>
                        <li className={styles.item}>Manage habits</li>
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