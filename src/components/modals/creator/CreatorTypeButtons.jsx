import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';

import HabitCreatorContext from '../../../context/habit-creator';

import { HABIT_TYPES } from '../../../constants/habits-properties';

import styles from '../../../styles/CreatorTypeButtons.module.css';
import { changeHabitType } from '../../../store';
import { CREATOR_TYPES } from '../../../constants/creator-types';

const CreatorTypeButtons = ({onCreatorTypeSelect}) => {
    const dispatch = useDispatch()
    const habitType = useSelector(state => state.goodHabitCreator.habitType);
    const {activeCreator} = useContext(HabitCreatorContext);

    
    const [activeDivSprings, activeDivApi] = useSpring(() => ({ left: `${(habitType + 1) * 6}rem`, config: { duration: 100 } }));

    const handleHabitTypeButtonClick = (e, habitType, number) => {
        e.preventDefault();
        try {
            switch (habitType) {
                case HABIT_TYPES.good:
                    onCreatorTypeSelect(CREATOR_TYPES.goodHabit);
                    break;
                case HABIT_TYPES.limit:
                    onCreatorTypeSelect(CREATOR_TYPES.limitHabit);
                    break;
                case HABIT_TYPES.quit:
                    onCreatorTypeSelect(CREATOR_TYPES.quitHabit);
                    break;
                default:
                    break;
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        if (activeCreator === CREATOR_TYPES.goodHabit) {
            activeDivApi.start({ left: '0rem' });
        } else if (activeCreator === CREATOR_TYPES.limitHabit) {
            activeDivApi.start({ left: '6rem' });
        } else if (activeCreator === CREATOR_TYPES.quitHabit) {
            activeDivApi.start({ left: '12rem' });
        }
     }, [activeCreator])

    return (
        <div className={styles["creator-type-buttons"]}>
            <animated.div style={activeDivSprings} className={styles['active-rectangle']}></animated.div>
            <button className={styles.btn} onClick={(e) => handleHabitTypeButtonClick(e, HABIT_TYPES.good, 0)}>{HABIT_TYPES.good}</button>
            <button className={styles.btn} onClick={(e) => handleHabitTypeButtonClick(e, HABIT_TYPES.limit, 1)}>{HABIT_TYPES.limit}</button>
            <button className={styles.btn} onClick={(e) => handleHabitTypeButtonClick(e, HABIT_TYPES.quit, 2)}>{HABIT_TYPES.quit}</button>
        </div>
    );
};

export default CreatorTypeButtons;