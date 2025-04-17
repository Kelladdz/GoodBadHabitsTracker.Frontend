import { useTransition, animated } from "react-spring";
import Habit from "./Habit";
import styles from '../../../styles/HabitList.module.css';

const HabitList = ({habits}) => {
    
    const habitTransition = useTransition(habits, {
        from: {height: '0rem', opacity: 0},
        enter: {height: '4rem', opacity: 1},
        leave: {height: '0rem', opacity: 0},
        config: {duration: 200}
    });

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