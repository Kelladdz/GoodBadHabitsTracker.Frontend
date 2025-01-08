import Comment from './Comment';
import CommentForm from './CommentForm';
import { useTransition, animated } from 'react-spring';
import styles from '../../../styles/CommentSection.module.css';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HabitContext from '../../../context/habit';
import CommentsContext from '../../../context/comments';
import { useFetchHabitQuery, useSearchHabitsQuery } from '../../../store';
import useFilter from '../../../hooks/useFilter';

const CommentSection = () => {
    const {activeHabit} = useContext(HabitContext);
    const currentDate = useSelector(state => state.calendar.currentDate);
    const currentDateString = currentDate.toISOString().substring(0, 10);
    const {data, error, isLoading} = useFetchHabitQuery(activeHabit.habit.id, {skip: !activeHabit})
    const comments = data?.habit.comments;
    const years = data ? [...new Set(comments.map(comment => comment.date.split('-')[0]))] : [];

    const commentsTransition = useTransition(comments, {
        from: {height: '0rem', opacity: 0},
        enter: {height: '3rem', opacity: 1},
        leave: {height: '0rem', opacity: 0},
        config: {duration: 200}
    });
    return (
        <div className={styles['comment-section']}>
            <div className={styles.list}>
                {years.map(year => 
                    <>
                        <div key={year} className={styles['year-box']}>
                            <span className={styles.year}>{year}</span>
                        </div>
                        {commentsTransition((style, comment) => (
                        comment.date.split('-')[0] === year && 
                        <animated.div style={style} key={comment.id}>
                            <Comment style={style} comment={comment} index={data.habit.comments.findIndex(c => c === comment)} />
                        </animated.div>)
                        )}
                    </>
                )}
                
            </div>
            <CommentForm/>
        </div>
    )
}

export default CommentSection;