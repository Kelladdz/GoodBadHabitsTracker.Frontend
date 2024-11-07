import {EDIT_COMMENT_ICON_ALTERNATE_LABEL, DELETE_COMMENT_ICON_ALTERNATE_LABEL} from '../../../constants/alternate-labels';

import EditCommentIcon from '../../../assets/svg/edit-comment-icon.svg';
import DeleteCommentIcon from '../../../assets/svg/delete-comment-icon.svg';

import styles from '../../../styles/Comment.module.css';

const Comment = () => {
    return (
        <div className={styles.comment}>
				<div className={styles['date-box']}>
					<div className={styles.month}>
						<p className={styles['month-value']}>Oct</p>
					</div>
					<div className={styles.day}>
						<p className={styles['day-value']}>11</p>
					</div>
				</div>
				<div className={styles['comment-box']}>
                    <div className={styles['text-box']}>
                        <p className={styles.content}>Udało się</p> 
                    </div>
                    <div className={styles.options}>
                        <button className={styles.btn}>
                            <img className={styles.icon} src={EditCommentIcon} alt={EDIT_COMMENT_ICON_ALTERNATE_LABEL} />
                        </button>
                        <button className={styles.btn}>
                            <img className={styles.icon} src={DeleteCommentIcon} alt={DELETE_COMMENT_ICON_ALTERNATE_LABEL} />
                        </button>
                    </div>
			    </div>
		</div>
    );
}

export default Comment;