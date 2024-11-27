import { useState, useContext, useEffect } from 'react';

import { useEditCommentMutation, useDeleteCommentMutation } from '../../../store';

import HabitContext from '../../../context/habit';
import CalendarContext from '../../../context/calendar';

import {EDIT_COMMENT_ICON_ALTERNATE_LABEL, DELETE_COMMENT_ICON_ALTERNATE_LABEL, ADD_COMMENT_ICON_ALTERNATE_LABEL} from '../../../constants/alternate-labels';
import { MONTHS } from '../../../constants/months';

import AddCommentIcon from '../../../assets/svg/add-comment-icon.svg';
import EditCommentIcon from '../../../assets/svg/edit-comment-icon.svg';
import DeleteCommentIcon from '../../../assets/svg/delete-comment-icon.svg';

import styles from '../../../styles/Comment.module.css';
import CommentsContext from '../../../context/comments';

const Comment = ({comment, index}) => {
    const {activeHabit} = useContext(HabitContext);
    const {currentDateString} = useContext(CalendarContext);
    const {onCommentDelete} = useContext(CommentsContext);
    const [editComment, {isLoading: isEditCommentLoading}] = useEditCommentMutation();
    const [deleteComment, {isLoading: isDeleteCommentLoading}] = useDeleteCommentMutation();

    const [editMode, setEditMode] = useState(false);
    const [body, setBody] = useState(comment.body);

    const month = comment.date.split('-')[1];
    const day = comment.date.split('-')[2];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (body.trim().length > 0) {
            const request = {
                id: activeHabit.id,
                body: body,
                date: currentDateString,
                index: index
            }

            try {
                await editComment(request).unwrap();
            } catch (error) {
                throw new Error(error);
            } finally {
                setEditMode(false);
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }



    const handleEditClick = () => {
        setEditMode(!editMode);
    }

    const handleDeleteClick = async () => {
        const request = {
            id: activeHabit.id,
            index: index
        }
        try {
            await deleteComment(request).unwrap();
            onCommentDelete(comment.id);
        } catch (error) {
            throw new Error(error);
        }
    }

    const handleCommentChange = (e) => {
        setBody(e.target.value);
    }

    useEffect(() => {
        setBody(body);
    },[editComment]);

    return (
        <div className={styles.comment}>
				<div className={styles['date-box']}>
					<div className={styles.month}>
						<p className={styles['month-value']}>{MONTHS[month - 1].substring(0,3)}</p>
					</div>
					<div className={styles.day}>
						<p className={styles['day-value']}>{day}</p>
					</div>
				</div>
				<div className={styles['comment-box']}>
                    <div className={styles['text-box']}>
                        {editMode ? 
                            <input className={styles.input} type='text' value={body} onChange={handleCommentChange} onKeyDown={handleKeyDown}/>
                            :
                            <p className={styles.content}>{body}</p> 
                        }
                    </div>
                    <div className={styles.options}>
                        {editMode ? 
                            <button className={styles.btn} type='button' onClick={handleSubmit}>
                                <img className={styles['submit-icon']} src={AddCommentIcon} alt={ADD_COMMENT_ICON_ALTERNATE_LABEL}/>
                            </button>
                            :
                            <><button className={styles.btn} onClick={handleEditClick}>
                                <img className={styles.icon} src={EditCommentIcon} alt={EDIT_COMMENT_ICON_ALTERNATE_LABEL} />
                            </button>
                            <button className={styles.btn} onClick={handleDeleteClick}>
                                <img className={styles.icon} src={DeleteCommentIcon} alt={DELETE_COMMENT_ICON_ALTERNATE_LABEL} />
                            </button></>
                        }
                    </div>
			    </div>
		</div>
    );
}

export default Comment;