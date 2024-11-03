import {useContext, useState, useEffect} from "react";

import LeftBarContext from "../../../context/left-bar";

import Habit from "./Habit";

import styles from '../../../styles/HabitList.module.css';
import { HABIT_TYPES } from "../../../constants/habits-properties";
import { useSelector } from "react-redux";
import { useTransition, animated, easings } from "react-spring";
import { easeExpIn } from "d3-ease";
import { LEFT_BAR_BUTTON_LABELS } from "../../../constants/button-labels";

const HabitList = ({isOpen, habits, close}) => {
    const {activeGroup} = useContext(LeftBarContext);
    console.log(habits);
    const divHeight = habits.length * 4;

    const habitTransition = useTransition(habits, {
        from: {height: '0rem', opacity: 0},
        enter: {height: '4rem', opacity: 1},
        leave: {height: '0rem', opacity: 0},
        config: {duration: 200}
    });

    useEffect(() => {
        if (activeGroup === LEFT_BAR_BUTTON_LABELS.goodHabits && habits.length > 0 && habits[0].habitType !== 0
            || activeGroup === LEFT_BAR_BUTTON_LABELS.badHabits && habits.length > 0 && habits[0].habitType === 0
        ) {
            close();
        }
    },[activeGroup]);   

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