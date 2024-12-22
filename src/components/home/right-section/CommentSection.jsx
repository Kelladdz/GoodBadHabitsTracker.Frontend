import Comment from './Comment';
import CommentForm from './CommentForm';

import styles from '../../../styles/CommentSection.module.css';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HabitContext from '../../../context/habit';
import CommentsContext from '../../../context/comments';
import { useSearchHabitsQuery } from '../../../store';
import useFilter from '../../../hooks/useFilter';

const CommentSection = () => {
    const {activeHabit} = useContext(HabitContext);
    const {comments, onCommentsFetch} = useContext(CommentsContext);
    const currentDate = useSelector(state => state.calendar.currentDate);
    const currentDateString = currentDate.toISOString().substring(0, 10);

    
    const years = comments ? [...new Set(comments.map(comment => comment.date.split('-')[0]))] : [];

    useEffect(() => {
            onCommentsFetch(activeHabit.habit.comments);
        
    },[activeHabit])
    return (
        <div className={styles['comment-section']}>
            <div className={styles.list}>
                {years.map(year => 
                    <><div key={year} className={styles['year-box']}>
                        <span className={styles.year}>{year}</span>
                    </div>
                    {comments.filter(comment => comment.date.split('-')[0] === year)
                    .map((comment, index) => <Comment comment={comment} index={index}/>)}</>
                )}
            </div>
            <CommentForm/>
        </div>
    )
}

export default CommentSection;