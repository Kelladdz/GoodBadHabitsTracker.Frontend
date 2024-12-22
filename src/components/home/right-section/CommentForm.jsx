import React, { useContext, useEffect, useState } from 'react';

import { useAddCommentMutation } from '../../../store';

import HabitContext from '../../../context/habit';
import CalendarContext from '../../../context/calendar';

import { ADD_COMMENT_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import AddCommentIcon from '../../../assets/svg/add-comment-icon.svg';

import styles from '../../../styles/CommentForm.module.css';
import CommentsContext from '../../../context/comments';

const CommentForm = () => {
    const {activeHabit} = useContext(HabitContext);
    const {currentDateString} = useContext(CalendarContext);
    const {onCommentAdd} = useContext(CommentsContext);
    const [addComment, {isLoading: isAddCommentLoading}] = useAddCommentMutation();
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim().length > 0) {
            
            const request = {
                habitId: activeHabit.habit.id,
                body: comment,
                date: currentDateString
            }

            try {
                addComment(request).unwrap();
            } catch (error) {
                throw new Error(error);
            } finally {
                setComment('');
            }
        }
    }

    const handleCommentChange = (e) => {
        e.preventDefault();
        setComment(e.target.value);
    }

    
    return (
        <form className={styles['comment-form']} onSubmit={handleSubmit}>
            <div className={styles['input-box']}>
                <input className={styles.input} type='text' value={comment} onChange={handleCommentChange} placeholder='Write a comment...'/>
            </div>
            <button className={styles.btn} type='submit'>
                <img className={styles.icon} src={AddCommentIcon} alt={ADD_COMMENT_ICON_ALTERNATE_LABEL}/>
            </button>
        </form>
    )
}

export default CommentForm;