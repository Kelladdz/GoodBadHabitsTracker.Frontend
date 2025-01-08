
import { useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSpringRef, useSpring, animated, useTransition, useChain } from 'react-spring';
import { easeElastic, easeExpOut } from 'd3-ease';

import { useDeleteAllHabitsMutation, useDeleteGroupMutation, useDeleteHabitMutation, useUpdateDayResultMutation, useDeleteAllProgressMutation } from '../../store';

import { useAuth } from '../../hooks/useAuth';

import LeftBarContext from '../../context/left-bar'
import ModalsContext from '../../context/modals';
import HabitContext from '../../context/habit';
import CalendarContext from '../../context/calendar';

import ModalButton from './ModalButton';

import { BUTTON_LABELS } from '../../constants/modal-labels';
import { MODAL_TYPES } from '../../constants/modal-types';
import { PRIMARY_MODAL_LABELS, SECONDARY_MODAL_LABEL } from '../../constants/modal-labels';

import styles from '../../styles/Modal.module.css';
import Timer from '../home/middle-section/Timer';
import { LEFT_BAR_BUTTON_LABELS } from '../../constants/button-labels';
import { useSelector } from 'react-redux';
import { PATHS } from '../../constants/paths';
import { useNavigate } from 'react-router-dom';

const Modal = () => {
    const navigate = useNavigate();
    const {activeModal, toggleModal} = useContext(ModalsContext);
    const {activeGroup, toggleActiveGroup} = useContext(LeftBarContext);
    const {activeHabit, toggleHabit} = useContext(HabitContext);
    const currentDate = useSelector(state => state.calendar.currentDate)
    const currentDateString = currentDate.toISOString().substring(0,10);

    const [deleteGroup, {isLoading: isGroupDeleteLoading}] = useDeleteGroupMutation();
    const [deleteHabit, {isLoading: isHabitDeleteLoading}] = useDeleteHabitMutation();
    const [updateDayResult, {isLoading: isUpdateDayResultLoading}] = useUpdateDayResultMutation();
    const [deleteAllHabits, {isLoading: isDeleteAllHabitsLoading}] = useDeleteAllHabitsMutation();
    const [deleteAllDayResults, {isLoading: isDeleteAllDayResultsLoading}] = useDeleteAllProgressMutation();

    const {deleteAccount} = useAuth();

    const [isOpen, setIsOpen] = useState(true);

    const ref = useRef();

    const backgroundSpringRef = useSpringRef();
    const backgroundSprings = useSpring({
        ref: backgroundSpringRef,
        from: {opacity: isOpen ? 0 : 1},
        to: {opacity: isOpen ? 1 : 0},
        config: {duration: 200}
    })

    const modalTransitionRef = useSpringRef();
    const modalTransition = useTransition(isOpen, {
        ref: modalTransitionRef,
        from: {transform: isOpen ? 'scale(0)' : 'scale(1)'},
        enter: { transform: isOpen ? 'scale(1)' : 'scale(0)' },
        config: {
            duration: isOpen ? 750 : 200,
            easing: isOpen ? easeElastic.amplitude(1) : easeExpOut}
    })

    useChain(isOpen
        ? [backgroundSpringRef, modalTransitionRef]
        : [modalTransitionRef, backgroundSpringRef], [0, 0.2]);

    const getModal = () => {
        if (activeModal === MODAL_TYPES.counter) {
            return <Timer handleCancelButtonClick={handleCancelButtonClick}/>
        } else {
            return (
            <>
                <span className={styles['primary-text']}>{primaryLabel()}</span>
                <span className={styles['secondary-text']}>{secondaryLabel()}</span>
                <div className={styles.btns}>
                    {buttons()}
                </div>
            </>)
        }
    }

    const primaryLabel = () => {
        switch (activeModal) {
            case MODAL_TYPES.deleteGroup:
                return PRIMARY_MODAL_LABELS.deleteGroup;
            case MODAL_TYPES.afterDeleteGroup:
                return PRIMARY_MODAL_LABELS.afterDeleteGroup;
            case MODAL_TYPES.deleteHabit:
                return PRIMARY_MODAL_LABELS.deleteHabit;
            case MODAL_TYPES.afterDeleteHabit:
                return PRIMARY_MODAL_LABELS.afterDeleteHabit;
            case MODAL_TYPES.undo:
                return PRIMARY_MODAL_LABELS.undo;
            case MODAL_TYPES.deleteAccount:
                return PRIMARY_MODAL_LABELS.deleteAccount;
            case MODAL_TYPES.deleteAllHabits:
                return PRIMARY_MODAL_LABELS.deleteAllHabits;
            case MODAL_TYPES.afterDeleteAllHabits:
                return PRIMARY_MODAL_LABELS.afterDeleteAllHabits;
            case MODAL_TYPES.deleteAllHabitsProgress:
                return PRIMARY_MODAL_LABELS.deleteAllHabitsProgress;
            case MODAL_TYPES.afterDeleteAllHabitsProgress:
                return PRIMARY_MODAL_LABELS.afterDeleteAllHabitsProgress;
            default:
                return '';
        }
    }

    const secondaryLabel = () => {
        if (activeModal === MODAL_TYPES.afterDeleteGroup || activeModal === MODAL_TYPES.afterDeleteHabit
            || activeModal === MODAL_TYPES.afterDeleteAllHabits || activeModal === MODAL_TYPES.afterDeleteAllHabitsProgress) {
            return '';
        } else {
            return SECONDARY_MODAL_LABEL;
        }
    }

    const buttons = () => {
        if (activeModal === MODAL_TYPES.deleteGroup || activeModal === MODAL_TYPES.deleteHabit
            || activeModal === MODAL_TYPES.deleteAccount || activeModal === MODAL_TYPES.deleteAllHabits
            || activeModal === MODAL_TYPES.deleteAllHabitsProgress
        ) {
            return (
                <>
                    <ModalButton className={styles.confirm} onClick={handleDeleteButtonClick} label={BUTTON_LABELS.delete}/>
                    <ModalButton className={styles.cancel} onClick={handleCancelButtonClick} label={BUTTON_LABELS.cancel} />
                </>
            )
        } else if (activeModal === MODAL_TYPES.undo) {
            return (
                <>
                    <ModalButton className={styles.confirm} onClick={handleUndoButtonClick} label={BUTTON_LABELS.confirm}/>
                    <ModalButton className={styles.cancel} onClick={handleCancelButtonClick} label={BUTTON_LABELS.cancel} />
                </>
            )
        } else {
            return (
                <ModalButton className={styles.cancel} onClick={handleCancelButtonClick} label={BUTTON_LABELS.back} />
            )
        }
    }

    const handleDeleteButtonClick = async () => {
        if (activeModal === MODAL_TYPES.deleteGroup) {
            const id = activeGroup.id;
            try {
                await deleteGroup(id).unwrap();
            } catch (err) {
                console.error('Deleting group failed', err);
            } finally {
                toggleActiveGroup(LEFT_BAR_BUTTON_LABELS.allHabits)
                toggleModal(MODAL_TYPES.afterDeleteGroup);
            }
        } else if (activeModal === MODAL_TYPES.deleteHabit) {
            const id = activeHabit.habit.id;
            try {
                await deleteHabit(id).unwrap();
            } catch (err) {
                console.error('Deleting habit failed', err);
            } finally {
                toggleHabit(null)
                toggleModal(MODAL_TYPES.afterDeleteHabit);
            }
        } else if (activeModal === MODAL_TYPES.deleteAccount) {
            console.log('Delete account');
            try {
                await deleteAccount();
            } catch (err) {
                console.error('Deleting account failed', err);
            } finally {
                toggleModal(null);
                navigate(PATHS.auth)
            }
        } else if (activeModal === MODAL_TYPES.deleteAllHabits) {
            try {
                await deleteAllHabits().unwrap();
            } catch (err) {
                console.error('Deleting all habits failed', err);
            } finally {
                toggleHabit(null);
                toggleModal(MODAL_TYPES.afterDeleteAllHabits);
            }
        } else if (activeModal === MODAL_TYPES.deleteAllHabitsProgress) {
            try {
                await deleteAllDayResults();
            } catch (err) {
                console.error('Deleting all progress failed', err);
            } finally {
                console.log('Finally block executed for deleteAllHabitsProgress'); // Dodaj logowanie
                toggleModal(MODAL_TYPES.afterDeleteAllHabitsProgress);
            }
        }
    }

    const handleUndoButtonClick = async () => {
        console.log(activeHabit)
        console.log(currentDateString);
        const currentDayResult = activeHabit.habit.dayResults.find(dr => dr.date === currentDateString) 
        console.log(currentDayResult);
        try {
            await updateDayResult({habitId: activeHabit.habit.id, id: currentDayResult.id, progress: 0, status: 3}).unwrap();
        } catch (err) {
            console.error('Updating day result failed', err);
        } finally {
            toggleModal(null);
        }
    }

    const handleCancelButtonClick = () => {
        setIsOpen(false);
        setTimeout(() => {
            toggleModal(null);
        }, 750);
    }


    return (
        <>
            {createPortal(<animated.div style={backgroundSprings} className={styles.modal}>
                    {modalTransition((style, item) => 
                    (<animated.div ref={ref} style={{...style}} className={styles.container}>
                        {getModal()}
                    </animated.div>))}
                </animated.div>,
                document.querySelector('.modal-container')
            )}
        </>
    )
}

export default Modal;