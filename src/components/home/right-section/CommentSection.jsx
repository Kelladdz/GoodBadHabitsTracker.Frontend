import Comment from './Comment';
import CommentForm from './CommentForm';

import styles from '../../../styles/CommentSection.module.css';


const CommentSection = () => {
    return (
        <div className={styles['comment-section']}>
            <div className={styles.list}>
                <div className={styles['year-box']}>
                    <span className={styles.year}>2024</span>
                </div>
                <Comment/>
                
            </div>
            <CommentForm/>
        </div>
    )
}

export default CommentSection;