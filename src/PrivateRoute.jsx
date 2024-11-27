import React, { useContext, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";

import { useAuth } from "./hooks/useAuth";

import { LeftBarProvider } from "./context/left-bar";
import { HabitProvider } from "./context/habit";
import { GroupsProvider } from "./context/groups";

import ContextMenuContext from "./context/context-menu";
import ProgressLoggerContext from "./context/progress-logger";
import ModalsContext from "./context/modals";
import HabitCreatorContext from "./context/habit-creator";
import TimerContext from "./context/timer";
import SettingsContext from "./context/settings";

import Header from "./components/home/header/Header"
import ContextMenu from "./components/ContextMenu";
import Creator from "./components/modals/creator/Creator";
import Modal from "./components/modals/Modal";
import DebugWindow from "./DebugWindow";
import Timer from "./components/home/middle-section/Timer";
import Settings from "./components/modals/settings/Settings";
import AuthDebug from "./AuthDebug";


const PrivateRoute = () => {
    
    const {activeMenu, hideContextMenu} = useContext(ContextMenuContext);
    const {activeModal} = useContext(ModalsContext);
    const {activeCreator} = useContext(HabitCreatorContext);
    const {isProgressLoggerOpen} = useContext (ProgressLoggerContext);
    const {isTimerOpen} = useContext(TimerContext);
    const {isSettingsOpen} = useContext(SettingsContext);
    
    const {accessTokenCheck, checkCookie, cookie} = useAuth();

    const ref = useRef(null);

    const handleClickOutsideContextMenu = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            console.log('Clicked outside context menu');
            hideContextMenu();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideContextMenu);
        accessTokenCheck();
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideContextMenu);
        }
    },[]);

    useEffect(() => {
		const intervalId = setInterval(checkCookie, 1000);

		return () => clearInterval(intervalId);
	}, [cookie]);





    return (
        <div style={{position: 'relative', height: '100vh'}}>
                <LeftBarProvider>
                    <HabitProvider>
                        <GroupsProvider>
                                {activeCreator && <Creator />}
                                {activeMenu && <ContextMenu ref={ref}/>}
                                {activeModal && <Modal activeModal={activeModal}/>}
                                {isTimerOpen && <Timer/>}
                                {isSettingsOpen && <Settings />}
                                <Header />
                                <Outlet />
                                <AuthDebug />
                        </GroupsProvider>
                    </HabitProvider>
                </LeftBarProvider>
                {(activeCreator || isProgressLoggerOpen) && <DebugWindow />}
        </div>
    )
}

export default PrivateRoute;