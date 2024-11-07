import { ADD_COMMENT_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import AddCommentIcon from '../../../assets/svg/add-comment-icon.svg';

import styles from '../../../styles/CommentForm.module.css';

const CommentForm = () => {
    return (
        <form className={styles['comment-form']} onSubmit={console.log('Comment submitted')}>
            <div className={styles['input-box']}>
                <input className={styles.input} type='text' placeholder='Write a comment...'/>
            </div>
            <button className={styles.btn} type='submit'>
                <img className={styles.icon} src={AddCommentIcon} alt={ADD_COMMENT_ICON_ALTERNATE_LABEL}/>
            </button>
        </form>
    )
}

export default CommentForm;