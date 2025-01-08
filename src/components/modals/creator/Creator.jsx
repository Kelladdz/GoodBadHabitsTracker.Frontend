import { useState, useRef, useContext, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { useSpringRef, useSpring, animated, useTransition, useChain } from 'react-spring';
import { easeElastic, easeExpOut } from 'd3-ease';

import { fillForm, changeIsTimeBased, changeFrequency, resetForm, useAddHabitMutation, changeHabitType, useFetchGroupsQuery, changeGroup, useUpdateHabitMutation } from '../../../store';

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
import HabitContext from '../../../context/habit';

const Creator = () => {
    const dispatch = useDispatch();
    const form = useSelector(state => state.goodHabitCreator);
    const {data: groupsData, error: groupsError, isLoading: groupsIsLoading} = useFetchGroupsQuery();
    const [addHabit, isLoading] = useAddHabitMutation();
    const [updateHabit, isUpdateLoading] = useUpdateHabitMutation()
    const {activeCreator, toggleCreator, activeEditor, toggleEditor} = useContext(HabitCreatorContext);
    const {activeHabit} = useContext(HabitContext)
    const [isOpen, setIsOpen] = useState(true);
    const [groupOptions, setGroupOptions] = useState(["None"]);
    const selectedGroup = groupsData.find(group => group.group.id === form.groupId);
    
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
                const flag = value === 0 ? true : false;
                dispatch(changeIsTimeBased(flag));
                break;
            case HABIT_PROPERTIES.frequency:
                dispatch(changeFrequency(value));
                break;
            case HABIT_PROPERTIES.group:
                value === 0 
                ? dispatch(changeGroup(null)) 
                : dispatch(changeGroup(groupsData[value - 1].group.id));
                break;
            default:
                throw new Error('Invalid property');
        }
    }

    const onCreatorTypeSelect = (creatorType) => {
        activeCreator ? toggleCreator(creatorType) : toggleEditor(creatorType);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let request;
        if (activeCreator) {
            try {
                
                request = {
                    name: form.name,
                    habitType: form.habitType,
                    iconId: form.iconIndex,
                    startDate: form.startDate,
                    isTimeBased: form.isTimeBased,
                    quantity: form.quantity,
                    frequency: form.frequency,
                    repeatMode: form.repeatMode,
                    repeatDaysOfMonth: form.repeatDaysOfMonth && form.repeatDaysOfMonth.length > 0 && form.habitType === 0 ? form.repeatDaysOfMonth : null,
                    repeatDaysOfWeek: form.repeatDaysOfWeek && form.repeatDaysOfWeek.length > 0 && form.habitType === 0 ? form.repeatDaysOfWeek : null,
                    repeatInterval: form.repeatInterval,
                    reminderTimes: null,
                    groupId: form.groupId
                } 
                addHabit(request).unwrap();
                dispatch(resetForm());
            } catch (error) {
                throw new Error(error);
            } finally {
                setIsOpen(false);
                setTimeout(() => {
                    toggleCreator(null);
                }, 750);
            
            }
            [
                "{\"op\":\"replace\",\"path\":\"/name\",\"value\":\"Change\"}",
                "{\"op\":\"replace\",\"path\":\"/iconId\",\"value\":2}",
                "{\"op\":\"replace\",\"path\":\"/quantity\",\"value\":6}",
                "{\"op\":\"replace\",\"path\":\"/frequency\",\"value\":1}",
                "{\"op\":\"replace\",\"path\":\"/repeatMode\",\"value\":null}",
                "{\"op\":\"replace\",\"path\":\"/repeatDaysOfMonth\",\"value\":null}",
                "{\"op\":\"replace\",\"path\":\"/repeatDaysOfWeek\",\"value\":null}",
                "{\"op\":\"replace\",\"path\":\"/repeatInterval\",\"value\":null}"
            ]
         } else {
            try {
                let operations = [];
                if (activeHabit.habit.name !== form.name && form.name !== null){
                    operations.push({op: "replace", path: "/name", value: form.name})
                } 
                if (activeHabit.habit.iconId !== form.iconIndex && form.iconIndex !== null){
                    operations.push({op: "replace", path: "/iconId", value: form.iconIndex})
                } 
                if (activeHabit.habit.startDate !== form.startDate && form.startDate !== null){
                    operations.push({op: "replace", path: "/startDate", value: form.startDate})
                } 
                if (activeHabit.habit.isTimeBased !== form.isTimeBased && form.isTimeBased !== null){
                    operations.push({op: "replace", path: "/isTimeBased", value: form.isTimeBased})
                } 
                if (activeHabit.habit.quantity !== form.quantity && form.quantity !== null){
                    operations.push({op: "replace", path: "/quantity", value: form.isTimeBased ? form.quantity * 60 : form.quality})
                } 
                if (activeHabit.habit.frequency !== form.frequency && form.frequency !== null){
                    operations.push({op: "replace", path: "/frequency", value: form.frequency})
                } 
                if (activeHabit.habit.repeatMode !== form.repeatMode && form.repeatMode !== null){
                    operations.push({op: "replace", path: "/repeatMode", value: form.repeatMode})
                } 
                if (activeHabit.habit.repeatDaysOfMonth !== form.repeatDaysOfMonth && form.repeatDaysOfMonth !== null){
                    activeHabit.habit.repeatDaysOfMonth.forEach((day, index) => {
                        if (!form.repeatDaysOfMonth.includes(day)){
                            operations.push({op: "remove", path: `/repeatDaysOfMonth/${index}`})
                        }
                    })
                    form.repeatDaysOfMonth.forEach((day) => {
                        if (!activeHabit.habit.repeatDaysOfMonth.includes(day)){
                            operations.push({op: "add", path: `/repeatDaysOfMonth/-`, value: day})
                        }
                    })
                } 
                if (activeHabit.habit.repeatDaysOfMonth !== form.repeatDaysOfMonth && activeHabit.habit.repeatDaysOfMonth.length !== 0 && form.repeatDaysOfMonth === null){
                    for (let i = activeHabit.habit.repeatDaysOfMonth.length - 1; i >= 0; i--){
                        operations.push({op: "remove", path: `/repeatDaysOfMonth/${i}`})
                    }
                } 
                if (activeHabit.habit.repeatDaysOfWeek !== form.repeatDaysOfWeek && form.repeatDaysOfWeek !== null){
                    activeHabit.habit.repeatDaysOfWeek.forEach((day, index) => {
                        if (!form.repeatDaysOfWeek.includes(day)){
                            operations.push({op: "remove", path: `/repeatDaysOfWeek/${index}`})
                        }
                    })
                    form.repeatDaysOfWeek.forEach((day) => {
                        if (!activeHabit.habit.repeatDaysOfWeek.includes(day)){
                            operations.push({op: "add", path: `/repeatDaysOfWeek/-`, value: day})
                        }
                    })
                } 
                if (activeHabit.habit.repeatDaysOfWeek !== form.repeatDaysOfWeek && activeHabit.habit.repeatDaysOfWeek.length !== 0 && form.repeatDaysOfWeek === null){
                    for (let i = activeHabit.habit.repeatDaysOfWeek.length - 1; i >= 0; i--){
                        operations.push({op: "remove", path: `/repeatDaysOfWeek/${i}`})
                    } 
                } 
                if (activeHabit.habit.repeatInterval !== form.repeatInterval && form.repeatInterval !== null){
                    operations.push({op: "replace", path: "/repeatInterval", value: form.repeatInterval})
                } 
                if (activeHabit.habit.groupId !== form.groupId && form.groupId !== null){
                    operations.push({op: "replace", path: "/groupId", value: form.groupId})
                } 
                const id = activeHabit.habit.id
                request = {
                    id, operations
                }
                updateHabit(request).unwrap();
                dispatch(resetForm());
            }catch (error) {
                throw new Error(error);
            } finally {
                setIsOpen(false);
                setTimeout(() => {
                    toggleEditor(null);
                }, 750);
            }
            
        }
       
    }
    
        
        
    

    const handleCancelClick = () => {
        
        dispatch(resetForm());
        setIsOpen(false);
        setTimeout(() => {
            toggleCreator(null);
                toggleEditor(null);
        }, 750);
    }

    useEffect(() => {
        if (repeatRef.current && activeCreator !== CREATOR_TYPES.goodHabit) {
            repeatRef.current.classList.add(styles.disabled);     
        } else if (repeatRef.current && (activeCreator === CREATOR_TYPES.goodHabit)) {
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

        switch (activeEditor) {
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
        if (activeEditor) dispatch(fillForm(activeHabit.habit));
    },[activeCreator, activeEditor])


    useEffect(() => {
        if (groupsData && !groupsIsLoading) {
            console.log(groupsData);
            setGroupOptions(prevGroups => [...prevGroups, ...groupsData.map((group) => group.group.name)]);
        }
    },[groupsData, groupsIsLoading])

    return (
        <>
            {createPortal(<animated.div style={backgroundSprings} className={styles.creator}>
                {creatorTransition((style, item) => 
                    (<animated.form onSubmit={handleSubmit} ref={formRef} style={{...style}} className={styles.container}>
                       
                        <div className={styles['form-column']}>
                            <CreatorNameInput />
                            <CreatorIconBox/>
                            {activeCreator && <CreatorTypeButtons onCreatorTypeSelect={onCreatorTypeSelect}/>}
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
                                {form.habitType === 0 && <div ref={repeatRef} className={styles[`repeat-dropdown-box`]}>
                                    <CreatorFormSection label={CREATOR_LABELS.repeat}>
                                        <CreatorRepeatDropdown/>
                                    </CreatorFormSection>
                                </div>}
                            </div>
                            <CreatorFormSection label={CREATOR_LABELS.group}>
                                <CreatorDropdown style={{width: 'calc(100% - 2px)'}} selectedGroup={selectedGroup} options={groupOptions} property={HABIT_PROPERTIES.group} handleOptionChange={handleOptionChange}/>
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