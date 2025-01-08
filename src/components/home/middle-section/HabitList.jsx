import {useContext, useEffect} from "react";
import { useTransition, animated } from "react-spring";

import LeftBarContext from "../../../context/left-bar";
import Habit from "./Habit";

import { LEFT_BAR_BUTTON_LABELS } from "../../../constants/button-labels";

import styles from '../../../styles/HabitList.module.css';

const HabitList = ({habits}) => {
    const {activeGroup} = useContext(LeftBarContext);
    
    const habitTransition = useTransition(habits, {
        from: {height: '0rem', opacity: 0},
        enter: {height: '4rem', opacity: 1},
        leave: {height: '0rem', opacity: 0},
        config: {duration: 200}
    });

    // useEffect(() => {
    //     if (activeGroup === LEFT_BAR_BUTTON_LABELS.goodHabits && habits.length > 0 && habits[0].habitType !== 0
    //         || activeGroup === LEFT_BAR_BUTTON_LABELS.badHabits && habits.length > 0 && habits[0].habitType === 0
    //     ) {
    //         close();
    //     }
    // },[activeGroup]);   

    return (
        <>
                    <ul className={styles['habit-list']}>
                        
                            {habitTransition((style, habit) => (
                                
                            <animated.li style={style} key={habit.id}>
                                <Habit habit={habit} />
                            </animated.li>
                        ))}
                    </ul>
        </>
    );
};

export default HabitList;