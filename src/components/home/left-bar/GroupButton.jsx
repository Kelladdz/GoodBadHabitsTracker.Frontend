import { useContext, useState, useRef, useEffect } from 'react';

import { useRenameGroupMutation } from '../../../store';

import LeftBarContext from '../../../context/left-bar';
import ContextMenuContext from '../../../context/context-menu';

import { CONTEXT_MENU_TYPES } from '../../../constants/context-menu-types';
import { GROUP_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import GroupIcon from '../../../assets/svg/group-icon.svg';

import styles from '../../../styles/GroupButton.module.css';

const GroupButton = ({group, order}) => {
    const {toggleContextMenu} = useContext(ContextMenuContext);
    const {toggleActiveGroup, toggleOrder, toggleEditModeToGroup, groupToEdit} = useContext(LeftBarContext);

    const [renameGroup, {isLoading: renameGroupLoading}] = useRenameGroupMutation(); 

    const [name, setName] = useState(group.name);

    const formRef = useRef();

    const showContextMenu = (e) => {
        e.preventDefault();
        toggleActiveGroup(group);
        toggleOrder(order);
        toggleContextMenu(CONTEXT_MENU_TYPES.customGroup, e.clientX, e.clientY);
    }

    const handleClick = () => {
        toggleActiveGroup(group);
        toggleOrder(order);
    }

    const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name !== '' && name !== group.name) {
            try {
                renameGroup({id: group.id, name: name}).unwrap();
                
                toggleActiveGroup(name);
                setName(name);
            } catch (error) {
                throw new Error(error);
            }
        } else if (name === group.name) {
            toggleEditModeToGroup(null);
            setName(group.name);
            throw new Error('Group name is the same');
        }
    }

    useEffect(() => {
		const handleKeyDown = event => {
			if (event.key === 'Escape') {
				toggleEditModeToGroup(null);
				setName(group.name);
			}
		};

        const handleClickOutside = event => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                toggleEditModeToGroup(null);
                setName(group.name);
            }
        }
		window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleClickOutside);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

    if (groupToEdit && groupToEdit.name !== group.name) {
        return (
            <button className={styles[`group-button`]} onClick={handleClick} onContextMenu={showContextMenu}>
                <div className={styles['icon-box']}>
                    <img className={styles.icon} src={GroupIcon} alt={GROUP_ICON_ALTERNATE_LABEL}/>
                </div>
                <span className={styles.label}>{group.name}</span>
            </button>);
    } else {
        return (
            <form ref={formRef} className={styles[`group-button`]} onSubmit={handleSubmit} >
                <div className={styles['icon-box']}>
                    <img className={styles.icon} src={GroupIcon} alt={GROUP_ICON_ALTERNATE_LABEL}/>
                </div>
                <input type='text' value={name} onChange={handleNameChange} autoFocus className={styles.input} maxLength={15} minLength={3} />
                <button type='submit' style={{ display: 'none' }}></button>
            </form>
        );
    }
}

export default GroupButton;