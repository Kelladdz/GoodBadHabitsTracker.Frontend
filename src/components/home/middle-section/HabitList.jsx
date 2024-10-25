import {useContext, useState, useEffect} from "react";

import Habit from "./Habit";

import styles from '../../../styles/HabitList.module.css';
import { HABIT_TYPES } from "../../../constants/habits-properties";
import { useSelector } from "react-redux";
import { useTransition, animated, easings } from "react-spring";
import { easeExpIn } from "d3-ease";

const HabitList = ({isOpen, habits}) => {
    
    const divHeight = habits.length * 4;
    const transitions = useTransition(isOpen, {
        from: { height: '0rem', },
        enter: { height: `${divHeight}rem`,},
        leave: { height: '0rem',},
        config: { 
            duration: 250,
            easing: easeExpIn},
    });

    return (
        <>
            {transitions((style, isOpen) =>
                isOpen ? (
                    <animated.ul style={style} className={styles['habit-list']}>
                        {habits.map(habit => (
                            <li key={habit.entity.id}>
                                <Habit habit={habit.entity} />
                            </li>
                        ))}
                    </animated.ul>
                ) : null
            )}
        </>
    );
};

export default HabitList;