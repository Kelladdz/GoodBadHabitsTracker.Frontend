import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import CalendarDebugWindow from "./CalendarDebugWindow";
import { PATHS } from "./constants/paths";
import { jwtDecode } from "jwt-decode";
import { getUser } from "./store";
import CreatorDebugWindow from "./CreatorDebugWindow";
import TimerDebugWindow from "./TimerDebugWindow";
import { MODAL_TYPES } from "./constants/modal-types";
import { logoutAction } from "./store/actions/authActions";


const PrivateRoute = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(state => state.auth.accessToken);
    const {activeMenu, hideContextMenu} = useContext(ContextMenuContext);
    const {activeModal} = useContext(ModalsContext);
    const {activeCreator, activeEditor} = useContext(HabitCreatorContext);
    const {isTimerOpen} = useContext(TimerContext);
    const {isSettingsOpen} = useContext(SettingsContext);

    const ref = useRef(null);

    const profile = localStorage.getItem("profile");
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

	useEffect(() => {
		if (accessToken === null) {
            localStorage.clear();
            navigate(PATHS.auth);
            
        } else if (JSON.parse(profile).idToken) {
            const user = jwtDecode(JSON.parse(profile).idToken);
            dispatch(getUser(user));
            console.log(user);
        } else {
            const user = jwtDecode(JSON.parse(profile).accessToken);
            dispatch(getUser(user));
            console.log(user);
        }
        
	},[accessToken, profile]);

    return (
        <div style={{position: 'relative', height: '100vh'}}>
                <LeftBarProvider>
                    <HabitProvider>
                        <GroupsProvider>
                                {(activeCreator || activeEditor) && <Creator />}
                                {activeMenu && <ContextMenu ref={ref}/>}
                                {activeModal && <Modal/>}
                                
                                {isSettingsOpen && <Settings />}
                                <Header />
                                <Outlet />
                                {/* {(activeCreator || activeEditor) && <CreatorDebugWindow />} */}
                                {/* {activeModal === MODAL_TYPES.counter && <TimerDebugWindow/>} */}
                        </GroupsProvider>
                    </HabitProvider>
                </LeftBarProvider>
        </div>
    )
}

export default PrivateRoute;