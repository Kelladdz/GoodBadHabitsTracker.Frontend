import Habit from "./Habit";

import styles from '../../../styles/HabitList.module.css';

const HabitList = ({type}) => {
    return (
        <ul className={styles['habit-list']}>
            <li><Habit name='Good habit' progress={30} quantity={60}/></li>
        </ul>
    )
}

export default HabitList;