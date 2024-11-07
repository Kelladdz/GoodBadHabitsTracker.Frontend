import { useDispatch } from 'react-redux';

import { changeStatus } from '../../../store';

import { DAY_RESULT_STATUSES } from '../../../constants/habits-properties';

import styles from '../../../styles/StatusOptionsList.module.css';

const StatusOptionsList = React.forwardRef(({props, onClose}, ref) => {
    const dispatch = useDispatch();

    const handleStatusOptionClick = (index) => {
        dispatch(changeStatus(index));
        onClose();
    }

    

    return (
            <ul ref={ref} className={styles.list}>
                {DAY_RESULT_STATUSES.map((status, index) => 
                    <li key={index} className={styles.item} onClick={() => handleStatusOptionClick(index)}>{status}</li>
                )}
            </ul>
    );
});

export default StatusOptionsList;