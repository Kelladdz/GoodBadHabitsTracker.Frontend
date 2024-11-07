import React, { useContext, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import { LeftBarProvider } from "./context/left-bar";
import { HabitProvider } from "./context/habit";
import { GroupsProvider } from "./context/groups";

import ContextMenuContext from "./context/context-menu";
import ProgressLoggerContext from "./context/progress-logger";
import ModalsContext from "./context/modals";
import HabitCreatorContext from "./context/habit-creator";

import Header from "./components/home/header/Header"
import ContextMenu from "./components/ContextMenu";
import Creator from "./components/modals/creator/Creator";
import Modal from "./components/modals/Modal";
import DebugWindow from "./DebugWindow";

const PrivateRoute = () => {
    const {activeMenu, hideContextMenu} = useContext(ContextMenuContext);
    const {activeModal} = useContext(ModalsContext);
    const {activeCreator} = useContext(HabitCreatorContext);
    const {isProgressLoggerOpen} = useContext (ProgressLoggerContext);
    
    const ref = useRef(null);

    const handleClickOutsideContextMenu = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            console.log('Clicked outside context menu');
            hideContextMenu();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideContextMenu);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideContextMenu);
        }
    },[]);

    return (
        <div style={{position: 'relative', height: '100vh'}}>
                <LeftBarProvider>
                    <HabitProvider>
                        <GroupsProvider>
                                {activeCreator && <Creator />}
                                {activeMenu && <ContextMenu ref={ref}/>}
                                {activeModal && <Modal activeModal={activeModal}/>}
                                <Header />
                                <Outlet />
                        </GroupsProvider>
                    </HabitProvider>
                </LeftBarProvider>
                {(activeCreator || isProgressLoggerOpen) && <DebugWindow />}
        </div>
    )
}

export default PrivateRoute;