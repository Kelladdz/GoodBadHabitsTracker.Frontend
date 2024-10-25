import { useDeleteGroupMutation } from '../../store';
import styles from '../../styles/Modal.module.css';
import { createPortal } from 'react-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import LeftBarContext from '../../context/left-bar'
import { BUTTON_LABELS } from '../../constants/modal-labels';
import { MODAL_TYPES } from '../../constants/modal-types';
import { PRIMARY_MODAL_LABELS, SECONDARY_MODAL_LABEL } from '../../constants/modal-labels';
import ModalsContext from '../../context/modals';
import ModalButton from './ModalButton';
import { useSpringRef, useSpring, animated, useTransition, useChain } from 'react-spring';
import { easeElastic, easeExpOut } from 'd3-ease';

const Modal = ({activeModal}) => {
    const {toggleModal} = useContext(ModalsContext);
    const {activeGroup} = useContext(LeftBarContext);

    const [deleteGroup, {isLoading}] = useDeleteGroupMutation();

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

    const primaryLabel = () => {
        switch (activeModal) {
            case MODAL_TYPES.deleteGroup:
                return PRIMARY_MODAL_LABELS.deleteGroup;
            default:
                return '';
        }
    }

    const handleDeleteButtonClick = async() => {
        const id = activeGroup.id;
        try {
            await deleteGroup(id).unwrap();
        } catch (err) {
            console.error('Deleting group failed', err);
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
                        <span className={styles['primary-text']}>{primaryLabel()}</span>
                        <span className={styles['secondary-text']}>{SECONDARY_MODAL_LABEL}</span>
                        <div className={styles.btns}>
                            <ModalButton className={styles.confirm} onClick={handleDeleteButtonClick} label={BUTTON_LABELS.delete}/>
                            <ModalButton className={styles.cancel} onClick={handleCancelButtonClick} label={BUTTON_LABELS.cancel} />
                        </div>
                    </animated.div>))}
                </animated.div>,
                document.querySelector('.modal-container')
            )}
        </>
    )
}

export default Modal;