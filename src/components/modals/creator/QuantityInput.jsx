import { useContext, useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { changeQuantity, useFetchHabitQuery } from '../../../store';

import HabitCreatorContext from '../../../context/habit-creator';

import IncrementButton from '../../../assets/svg/increment-button.svg';

import { DECREMENT_ICON_ALTERNATE_LABEL, INCREMENT_ICON_ALTERNATE_LABEL } from '../../../constants/alternate-labels';
import { CREATOR_TYPES } from '../../../constants/creator-types';

import styles from '../../../styles/QuantityInput.module.css';
import { set } from 'lodash';
import HabitContext from '../../../context/habit';

const QuantityInput = () => {
    const dispatch = useDispatch();
    const isTimeBased = useSelector(state => state.goodHabitCreator.isTimeBased);
    const quantity = useSelector(state => state.goodHabitCreator.quantity);
    
    const {activeCreator, activeEditor} = useContext(HabitCreatorContext);
    const {activeHabit} = useContext(HabitContext);
    const {data, error, isLoading: isHabitLoading} = useFetchHabitQuery(activeHabit?.habit.id, {skip: activeHabit == null}) || [];
    
    const setInitialQuantityToDisplay = () => {
        if (activeEditor && isTimeBased) {
            return data.habit.quantity / 60;
        } else if (activeEditor && !isTimeBased) {
            return quantity
        } else return 1;
    }
    
    const [quantityToDisplay, setQuanityToDisplay] = useState(setInitialQuantityToDisplay());

    const ref = useRef();

    const handleQuantityChange = (e) => {
        e.preventDefault();
        setQuanityToDisplay(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter')
            handleQuantityChange(e);
    }

    const handleIncrementButtonClick = (e) => {
        e.preventDefault();
        setQuanityToDisplay(prev => prev + 1)
    }

    const handleDecrementButtonClick = (e) => {
        e.preventDefault();
        if (quantityToDisplay > 1) {
            setQuanityToDisplay(prev => prev - 1)
        }
    }

    

    useEffect(() => {
        if (ref.current && (activeCreator === CREATOR_TYPES.quitHabit || activeEditor === CREATOR_TYPES.quitHabit)) {
            ref.current.classList.add(styles.disabled);     
        } else if (ref.current && activeCreator !== CREATOR_TYPES.quitHabit && activeEditor !== CREATOR_TYPES.quitHabit) {
            ref.current.classList.remove(styles.disabled);     
        }
    },[activeCreator, activeEditor])

    useEffect(() => {
        isTimeBased ? dispatch(changeQuantity(quantityToDisplay*60)) : dispatch(changeQuantity(quantityToDisplay))
    },[isTimeBased])
    useEffect(() => {
        dispatch(changeQuantity(quantityToDisplay));
    }, [quantityToDisplay])

    return (
        <div ref={ref} className={styles['quantity-input']}>
            <input min={1} type='number' value={quantityToDisplay} className={styles.input} onKeyDown={handleKeyDown} onChange={handleQuantityChange}/>
            <div className={styles.btns}>
                <button className={styles.btn} onClick={handleIncrementButtonClick}>
                    <img className={styles.icon} src={IncrementButton} alt={INCREMENT_ICON_ALTERNATE_LABEL}/>
                </button>
                <button className={styles.btn} onClick={handleDecrementButtonClick}>
                    <img className={styles.icon} style={{transform: 'rotate(180deg)'}} src={IncrementButton} alt={DECREMENT_ICON_ALTERNATE_LABEL}/>
                </button>
            </div>
        </div> 
    )
}

export default QuantityInput;