import { useState, useRef, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { useSpringRef, useSpring, animated, useTransition, useChain } from 'react-spring';
import { easeElastic, easeExpOut } from 'd3-ease';

import { changeIsTimeBased, changeFrequency, resetForm, useAddHabitMutation, changeHabitType, useFetchGroupsQuery, changeGroup } from '../../../store';

import HabitCreatorContext from '../../../context/habit-creator';

import CreatorNameInput from './CreatorNameInput';
import CreatorIconBox from './CreatorIconBox';
import CreatorTypeButtons from './CreatorTypeButtons';
import CreatorFormSection from './CreatorFormSection';
import QuantityInput from './QuantityInput';
import CreatorDropdown from './CreatorDropdown';
import CreatorRepeatDropdown from './CreatorRepeatDropdown';
import CreatorCalendarDropdown from './CreatorCalendarDropdown';

import { CREATOR_LABELS } from '../../../constants/creator-labels';
import { HABIT_PROPERTIES, HABITS_FREQUENCIES, HABITS_QUANTITY_UNITS } from '../../../constants/habits-properties';
import { CREATOR_TYPES } from '../../../constants/creator-types';

import styles from '../../../styles/Creator.module.css';

const Creator = () => {
    const dispatch = useDispatch();
    const form = useSelector(state => state.goodHabitCreator);

    const {data: groupsData, error: groupsError, isLoading: groupsIsLoading} = useFetchGroupsQuery();
    const [addHabit, isLoading] = useAddHabitMutation();

    const {activeCreator, toggleCreator} = useContext(HabitCreatorContext);
    
    const [isOpen, setIsOpen] = useState(true);
    const [groupOptions, setGroupOptions] = useState([]);

    const formRef = useRef();
    const repeatRef = useRef();
    const calendarRef = useRef();

    const backgroundSpringRef = useSpringRef();
    const backgroundSprings = useSpring({
        ref: backgroundSpringRef,
        from: {opacity: isOpen ? 0 : 1},
        to: {opacity: isOpen ? 1 : 0},
        config: {duration: 200}
    })

    const creatorTransitionRef = useSpringRef();
    const creatorTransition = useTransition(isOpen, {
        ref: creatorTransitionRef,
        from: {transform: isOpen ? 'scale(0)' : 'scale(1)',},
        enter: { transform: isOpen ? 'scale(1)' : 'scale(0)' },
        config: {
            duration: isOpen ? 750 : 200,
            easing: isOpen ? easeElastic.amplitude(1) : easeExpOut}
    })

    

    useChain(isOpen
        ? [backgroundSpringRef, creatorTransitionRef]
        : [creatorTransitionRef, backgroundSpringRef], [0, 0.2]);

    const handleOptionChange = (property, value) => {
        console.log('handle option change... ', property, value);
        switch (property) {
            case HABIT_PROPERTIES.isTimeBased:
                console.log('handle isTimeBased change... ', value);
                const flag = value === HABITS_QUANTITY_UNITS[0] ? true : false;
                dispatch(changeIsTimeBased(flag));
                break;
            case HABIT_PROPERTIES.frequency:
                dispatch(changeFrequency(value));
                break;
            case HABIT_PROPERTIES.group:
                dispatch(changeGroup(groupsData[value].entity.id));
            default:
                throw new Error('Invalid property');
        }
    }

    const onCreatorTypeSelect = (creatorType) => {
        toggleCreator(creatorType);
    }

    const handleSubmit = () => {
        let request = {
            name: form.name,
            habitType: form.habitType,
            iconId: form.iconIndex,
            startDate: form.startDate,
            isTimeBased: form.habitType === 0 ? form.isTimeBased : null,
            quantity: form.habitType !== 2 ? form.quantity : null,
            frequency: form.habitType !== 2 ? form.frequency : null,
            repeatMode: form.habitType === 0 ? form.repeatMode : null,
            repeatDaysOfMonth: form.repeatDaysOfMonth.length > 0 && form.habitType === 0 ? form.repeatDaysOfMonth : null,
            repeatDaysOfWeek: form.repeatDaysOfWeek.length > 0 && form.habitType === 0 ? form.repeatDaysOfWeek : null,
            repeatInterval: form.habitType === 0 ? form.repeatInterval : null,
            reminderTimes: null,
            groupId: form.groupId
        }
        try {
            addHabit(request);
            dispatch(resetForm());
            setIsOpen(false);
            setTimeout(() => {
                toggleCreator(null);
            }, 750);
        } catch (error) {
            throw new Error(error);
        }
        
    }

    const handleCancelClick = () => {
        
        dispatch(resetForm());
        setIsOpen(false);
        setTimeout(() => {
            toggleCreator(null);
        }, 750);
    }

    useEffect(() => {
        if (repeatRef.current && activeCreator !== CREATOR_TYPES.goodHabit) {
            repeatRef.current.classList.add(styles.disabled);     
        } else if (repeatRef.current && activeCreator === CREATOR_TYPES.goodHabit) {
            repeatRef.current.classList.remove(styles.disabled);     
        }

        switch (activeCreator) {
            case CREATOR_TYPES.goodHabit:
                dispatch(changeHabitType(0));
                break;
            case CREATOR_TYPES.limitHabit:
                dispatch(changeHabitType(1));
                break;
            case CREATOR_TYPES.quitHabit:
                dispatch(changeHabitType(2));
                break;
            default:
                break;
        }
    },[activeCreator])

    useEffect(() => {
        if (groupsData && !groupsIsLoading && groupOptions.length === 0) {
            setGroupOptions(groupsData.map((group) => group.entity.name));
        }
    })

    return (
        <>
            {createPortal(<animated.div style={backgroundSprings} className={styles.creator}>
                {creatorTransition((style, item) => 
                    (<animated.form onSubmit={handleSubmit} ref={formRef} style={{...style}} className={styles.container}>
                       
                        <div className={styles['form-column']}>
                            <CreatorNameInput />
                            <CreatorIconBox/>
                            <CreatorTypeButtons onCreatorTypeSelect={onCreatorTypeSelect}/>
                            <CreatorFormSection style={style} label={CREATOR_LABELS.goal}>
                                <QuantityInput/>
                                <CreatorDropdown options={HABITS_QUANTITY_UNITS} property={HABIT_PROPERTIES.isTimeBased} handleOptionChange={handleOptionChange}/>
                                <CreatorDropdown options={HABITS_FREQUENCIES} property={HABIT_PROPERTIES.frequency} handleOptionChange={handleOptionChange}/>
                            </CreatorFormSection>
                            <div className={styles['form-row']}>
                            <div ref={calendarRef} className={styles[`calendar-dropdown-box`]}>
                                    <CreatorFormSection label={CREATOR_LABELS.startDate}>
                                        <CreatorCalendarDropdown/>
                                    </CreatorFormSection>
                                </div>
                                <div ref={repeatRef} className={styles[`repeat-dropdown-box`]}>
                                    <CreatorFormSection label={CREATOR_LABELS.repeat}>
                                        <CreatorRepeatDropdown/>
                                    </CreatorFormSection>
                                </div>
                            </div>
                            <CreatorFormSection label={CREATOR_LABELS.group}>
                                <CreatorDropdown style={{width: 'calc(100% - 2px)'}} options={groupOptions} property={HABIT_PROPERTIES.group} handleOptionChange={handleOptionChange}/>
                            </CreatorFormSection>
                            <div className={styles.btns}>
                                <input type="button" value="Cancel" className={styles.btn} onClick={handleCancelClick}/>
                                <input type="submit" value="Submit" className={styles.btn}/>
                            </div>
                        </div>
                    </animated.form>))}
            </animated.div>, document.querySelector('.modal-container'))}
        </>
    )
}

export default Creator;