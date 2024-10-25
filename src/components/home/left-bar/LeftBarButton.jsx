import { useContext } from 'react';

import ContextMenuContext from '../../../context/context-menu';

import { CONTEXT_MENU_TYPES } from '../../../constants/context-menu-types';

import styles from '../../../styles/LeftBarButton.module.css';
import LeftBarContext from '../../../context/left-bar';

const LeftBarButton = ({style, icon, alt, label, contextMenuType, handleLeftBarButtonClick}) => {
    const {toggleContextMenu} = useContext(ContextMenuContext);
    const {activeGroup, toggleActiveGroup} = useContext(LeftBarContext);

    const activeGroupClass = activeGroup === label ? '-active' : '';

    const showContextMenu = (e) => {
        e.preventDefault();
        if (contextMenuType !== CONTEXT_MENU_TYPES.none) {
            toggleContextMenu(contextMenuType, e.clientX, e.clientY);
        }  
    }

    

    return (
        <button className={styles[`left-bar-button`]} onClick={handleLeftBarButtonClick} onContextMenu={event => showContextMenu(event)}>
            <div className={styles['icon-box']}>
                <img className={styles.icon} style={style} src={icon} alt={alt}/>
            </div>
            <span className={styles.label}>{label}</span>
        </button>
        
    );
}

export default LeftBarButton;