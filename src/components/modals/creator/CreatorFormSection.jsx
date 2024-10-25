import { useContext, useEffect, useRef } from 'react'
import { useTransition, animated } from 'react-spring'
import styles from '../../../styles/CreatorFormSection.module.css'
import HabitCreatorContext from '../../../context/habit-creator'
import { CREATOR_TYPES } from '../../../constants/creator-types'
import { CREATOR_LABELS } from '../../../constants/creator-labels'

const CreatorFormSection = ({label, children}) => {
    const {activeCreator} = useContext(HabitCreatorContext);

    const ref = useRef();

    useEffect(() => {
        if (ref.current && activeCreator === CREATOR_TYPES.quitHabit && label !== CREATOR_LABELS.startDate && label !== CREATOR_LABELS.group) {
            ref.current.classList.add(styles.disabled);     
        } else if (ref.current && activeCreator !== CREATOR_TYPES.quitHabit) {
            ref.current.classList.remove(styles.disabled);     
        }
    },[activeCreator])

    return (
        <div ref={ref} className={styles['creator-form-section']}>
            <span  className={styles.label}>{label}</span>
            <div className={styles['select-inputs-box']}>
                {children}
            </div>
        </div>)

}

export default CreatorFormSection;