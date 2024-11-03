import React, { useContext, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import ContextMenuContext from "./context/context-menu";

import Header from "./components/home/header/Header"
import ContextMenu from "./components/ContextMenu";
import Creator from "./components/modals/creator/Creator";
import { LeftBarProvider } from "./context/left-bar";
import ModalsContext from "./context/modals";
import Modal from "./components/modals/Modal";
import HabitCreatorContext from "./context/habit-creator";
import DebugWindow from "./DebugWindow";
import { HabitProvider } from "./context/habit";

const PrivateRoute = () => {
    const {activeMenu, hideContextMenu} = useContext(ContextMenuContext);
    const {activeModal} = useContext(ModalsContext);
    const {activeCreator} = useContext(HabitCreatorContext);
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
                    {activeCreator && <Creator />}
                    {activeMenu && <ContextMenu ref={ref}/>}
                    {activeModal && <Modal activeModal={activeModal}/>}
                    <Header />
                    <Outlet />
                </HabitProvider>
            </LeftBarProvider>
            {activeCreator && <DebugWindow />}
        </div>
    )
}

export default PrivateRoute;