import Comment from './Comment';
import CommentForm from './CommentForm';

import styles from '../../../styles/CommentSection.module.css';
import { useContext, useEffect } from 'react';
import HabitContext from '../../../context/habit';
import CommentsContext from '../../../context/comments';

const CommentSection = () => {
    const {activeHabit} = useContext(HabitContext);
    const {comments, onCommentsFetch} = useContext(CommentsContext);
    
    const years = comments ? [...new Set(comments.map(comment => comment.date.split('-')[0]))] : [];

    useEffect(() => {
        if (activeHabit && activeHabit.comments.length > 0) {
            onCommentsFetch(activeHabit.comments);
        }
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