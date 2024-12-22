import IncrementButton from '../../../assets/svg/increment-button.svg';

import { DECREMENT_ICON_ALTERNATE_LABEL, INCREMENT_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import styles from '../../../styles/NumberInput.module.css';

const NumberInput = ({ disabled, value, onChange, onIncrement, onDecrement }) => {
    return (
            <div className={styles['number-input']}>
                <input min={1} type='number' value={value} className={styles.input} onChange={onChange} disabled={disabled}/>
                <div className={styles.btns}>
                    <button className={styles.btn} onClick={onIncrement}>
                        <img className={styles.icon} src={IncrementButton} alt={INCREMENT_ICON_ALTERNATE_LABEL}/>
                    </button>
                    <button className={styles.btn} onClick={onDecrement}>
                        <img className={styles.icon} style={{transform: 'rotate(180deg)'}} src={IncrementButton} alt={DECREMENT_ICON_ALTERNATE_LABEL}/>
                    </button>
                </div>
            </div> 
        )
}

export default NumberInput;