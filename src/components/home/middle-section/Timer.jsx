import { useState, useContext, useEffect, useRef, useReducer } from 'react';
import { createPortal } from 'react-dom';
import { useSpring, animated } from 'react-spring';

import { changeTimerState, changeCountingDirection, toggleEndlessTimer, 
    changeDuration, durationIncrement, durationDecrement, timeCount,
    countingStartForGoodHabit, countingStartForLimitHabit, reset, useUpdateDayResultMutation } from '../../../store';

import HabitContext from '../../../context/habit';
import CalendarContext from '../../../context/calendar';
import ModalContext from '../../../context/modals';

import { CARET_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import Caret from '../../../assets/svg/caret.svg';
import SadIcon from '../../../assets/svg/sad-face-icon.svg'

import styles from '../../../styles/Timer.module.css';

import NumberInput from '../shared/NumberInput';
import { useDispatch, useSelector } from 'react-redux';
import { COUNTING_DIRECTIONS, TIMER_STATES } from '../../../constants/timer-properties';

const Timer = React.forwardRef(({props, handleCancelButtonClick}, ref) => {
    const dispatch = useDispatch();
    const timer = useSelector(state => state.timer);

    const {activeHabit} = useContext(HabitContext);
    const {currentDateString} = useContext(CalendarContext);
    const {toggleModal} = useContext(ModalContext);

    const [updateDayResult, isLoading] = useUpdateDayResultMutation();

    const currentDayResult = activeHabit.habit.dayResults.find(dr => dr.date === currentDateString)
    const timerState = timer.timerState;
    const duration = timer.duration;
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [remainingTime, setRemainingTime] = useState(duration);
    const endlessTimer = timer.endlessTimer;
    const countingDirection = timer.countingDirection;

    const isLimitHabitComplete = timeElapsed < activeHabit.habit.quantity && activeHabit.habit.habitType === 1;
    const isLimitHabitFailed = timeElapsed >= activeHabit.habit.quantity && activeHabit.habit.habitType === 1;
    const isGoodHabitComplete = timeElapsed >= activeHabit.habit.quantity && activeHabit.habit.habitType === 0
    const isGoodHabitFailed = timeElapsed < activeHabit.habit.quantity && activeHabit.habit.habitType === 0

    const remainingMinutes = Math.floor(remainingTime / 60);
    const displayRemainingSeconds = remainingTime % 60;    
    const elapsedMinutes = Math.floor(timeElapsed / 60);
    const displayElapsedSeconds = timeElapsed % 60

    const handleDurationChange = (e) => {
        dispatch(changeDuration(e.target.value * 60));
        setRemainingTime(e.target.value * 60)
    }

    const handleDurationIncrement = () => {
        if(!endlessTimer){
            dispatch(durationIncrement())
            setRemainingTime(duration)
        }     
    }

    const handleDurationDecrement = () => {
        if(!endlessTimer){
            dispatch(durationDecrement())
            setRemainingTime(duration)
        }
    }

    const handleStartClick = () => {
        if (activeHabit.habit.habitType === 0) {
            dispatch(countingStartForGoodHabit())
            goodHabitsTimerApi.start({strokeDashoffset: -1, strokeDasharray: 1})
        } else if (activeHabit.habit.habitType === 1) {
            dispatch(countingStartForLimitHabit())
            limitHabitsTimerApi.start({strokeDashoffset: 0, strokeDasharray: 1})
        } else if (endlessTimer) {
            dispatch(countingStartForEndlessTimer())
        }
    }

    const handleCloseClick = () => {
        dispatch(reset());
        toggleModal(null);
    }

    const handlePauseClick = () => {
        dispatch(changeTimerState(TIMER_STATES.pause));
        if (activeHabit.habit.habitType === 0) {
            goodHabitsTimerApi.pause()
        } else {
            limitHabitsTimerApi.pause()
        }
        
    }

    const handleStopClick = () => {
        dispatch(changeTimerState(TIMER_STATES.stop));
        if (activeHabit.habit.habitType === 0) {
            goodHabitsTimerApi.stop(true)
        } else {
            limitHabitsTimerApi.stop(true)
        }
    }

    const handleNewSessionClick = () => {
        dispatch(reset());
        setRemainingTime(duration);
        if (activeHabit.habit.habitType === 0) {
            goodHabitsTimerApi.set({ strokeDashoffset: 0, strokeDasharray: 1});
        } else {
            limitHabitsTimerApi.set({ strokeDashoffset: 1, strokeDasharray: 1});
        }
    }

    const logProgress = async () => {
        let request;
        if (activeHabit.habit.habitType === 0 && currentDayResult.progress + timeElapsed >= activeHabit.habit.quantity) {
            request = {
                habitId: activeHabit.habit.id,
                id: currentDayResult.id,
                progress: currentDayResult.progress + timeElapsed,
                status: 0
            }
        } else if (activeHabit.habit.habitType === 0 && currentDayResult.progress + timeElapsed < activeHabit.habit.quantity) {
            request = {
                habitId: activeHabit.habit.id,
                id: currentDayResult.id,
                progress: currentDayResult.progress + timeElapsed,
                status: 3
            }
        } else if (activeHabit.habit.habitType === 1 && currentDayResult.progress + timeElapsed <= activeHabit.habit.quantity) {
            request = {
                habitId: activeHabit.habit.id,
                id: currentDayResult.id,
                progress: currentDayResult.progress + timeElapsed,
                status: 3
            }
        } else if (activeHabit.habit.habitType === 1 && currentDayResult.progress + timeElapsed >= activeHabit.habit.quantity) {
            request = {
                habitId: activeHabit.habit.id,
                id: currentDayResult.id,
                progress: currentDayResult.progress + timeElapsed,
                status: 1
            }
        }
        try {
            await updateDayResult(request).unwrap();
        } catch (error) {
            throw new Error(error);
        } 
    }

    const logProgressAndQuit = async () => {
        try {
            await logProgress()
        } catch (error) {
            throw new Error(error);
        } finally { 
            dispatch(reset())
            toggleModal(null);
        }
        
    }

    const handleResumeClick = () => {
        dispatch(changeTimerState(TIMER_STATES.play))
        if (activeHabit.habit.habitType === 0) {
            goodHabitsTimerApi.resume()
        } else {
            limitHabitsTimerApi.resume()
        }
    }

    

    const buttons = () => {
        switch (timerState) {
            case TIMER_STATES.init:
                return (
                    <div className={styles.btns}>
                        <button className={styles.btn} onClick={handleStartClick}>Start</button>
                        <button className={styles.btn} onClick={handleCloseClick}>Cancel</button>
                    </div>)
            case TIMER_STATES.play:
                return (
                    <div className={styles.btns}>
                        <button className={styles.btn} onClick={handlePauseClick}>Pause</button>
                        <div className={styles.btn} onClick={handleStopClick}>Stop</div>
                    </div>)
            case TIMER_STATES.finish:
                return (
                    <div className={styles.btns}>
                        <button className={styles.btn} onClick={handleCloseClick}>Close</button>
                        <button className={styles.btn} onClick={handleNewSessionClick}>New Session</button>
                    </div>)
            case TIMER_STATES.stop:
                return (
                    <div className={styles.btns}>
                        <button className={styles.btn} onClick={handleCloseClick}>Close</button>
                        <button className={styles.btn} onClick={handleNewSessionClick}>New Session</button>
                    </div>)
            case TIMER_STATES.pause:
                return (
                    <div className={styles.btns}>
                        <button className={styles.btn} onClick={logProgressAndQuit}>Log Progress</button>
                        <button className={styles.btn} onClick={handleResumeClick}>Resume</button>
                    </div>
                )
            default:
                break;
        }
    }
 
 const [goodHabitsTimerSprings, goodHabitsTimerApi] = useSpring(() => ({ strokeDashoffset: 0, strokeDasharray: 1, config: { duration: duration * 200 } }));
 const [limitHabitsTimerSprings, limitHabitsTimerApi] = useSpring(() => ({ strokeDashoffset: 1, strokeDasharray: 1, config: { duration: duration * 200 } }));


    const showCheck = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: timerState === TIMER_STATES.finish ? 1 : 0
        },
        config: {
            duration: 750
        }
    
    })

    useEffect(() => {
        let countingInterval
        if (timerState === TIMER_STATES.play) {
            countingInterval = setInterval(() => {
                setTimeElapsed(prev => prev + 1)
                setRemainingTime(prev => prev - 1)
            }, 1000);
        }else if (timerState === TIMER_STATES.stop || timerState === TIMER_STATES.finish) {
            clearInterval(countingInterval);
        }
        return () => {
            clearInterval(countingInterval);
        } 

    },[timerState]);

    useEffect(() => {
        if (timeElapsed === duration) {
            dispatch(changeTimerState(TIMER_STATES.finish))
        } 
    },[timeElapsed])

    useEffect(() => {
        console.log(timeElapsed + currentDayResult.progress >= activeHabit.habit.quantity )
        if (timerState === TIMER_STATES.finish) {
            logProgress()
        }
    },[timerState])



    return (
        //<>{createPortal(
            <div className={styles.timer}>
                <div className={styles['upper-side']}>

                    {timerState === TIMER_STATES.init &&
                    <>
                        <span className={styles['primary-label']}>
                            Select duration
                        </span>
                        <div  className={`${styles['duration-input-box']} ${endlessTimer ? styles.disabled : ''}`}>
                            <NumberInput disabled={endlessTimer} value={duration / 60} onChange={handleDurationChange} onIncrement={!endlessTimer && handleDurationIncrement} onDecrement={!endlessTimer && handleDurationDecrement}/>
                            <span className={styles.label}>minutes</span>
                        </div>
                        <div className={styles['checkbox-box']}>
                            <input id="timer" type="checkbox" checked={endlessTimer} onChange={() => dispatch(toggleEndlessTimer(!endlessTimer))}/>
                            <label className={styles.label} for="timer">Endless timer</label>
                        </div>
                    </>}

                    {timerState === TIMER_STATES.stop &&
                    <>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <span className={styles['primary-label']}>Session Stopped</span>
                            <span className={styles['secondary-label']}>Do you want log your current progress?</span>

                            {isGoodHabitComplete && <span className={styles['secondary-label']}>(You spent enough time to pass this day.)</span>}
                            {isGoodHabitFailed && <span className={styles['secondary-label']}>(You didn't spend enough time to pass this day.)</span>}

                            {isLimitHabitComplete && <span className={styles['secondary-label']}>(If you will end this day right now, result will be log as completed.)</span>}
                            {isLimitHabitFailed && <span className={styles['secondary-label']}>(Unfortunally, you exceeded the allowed time, so you failed...)</span>}
                        </div>
                    </>}

                    {timerState === TIMER_STATES.finish &&
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <span className={styles['primary-label']}>Session Complete</span>
                        {isGoodHabitComplete && <span className={styles['secondary-label']}>(Result for this day will be log as completed.)</span>}
                        {isLimitHabitFailed && <span className={styles['secondary-label']}>(Unfortunally, you exceeded the allowed time, so you failed...)</span>}
                        <span className={styles['secondary-label']}>Your result has been logged for {activeHabit.habit.name}.</span>
                    </div>}
                </div>
                    
                    
                
                
                <>
                    <div className={styles.counter}>

                        {(timerState === TIMER_STATES.play || timerState === TIMER_STATES.pause) && countingDirection === COUNTING_DIRECTIONS.counterClockwise &&
                            <svg style={{transform: 'rotateX(180deg)', zIndex: 3}} width="264" height="264" viewBox="0 0 264 264" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <animated.path  className={styles.circle} style={goodHabitsTimerSprings} d="M261 132C261 203.245 203.245 261 132 261C60.7553 261 3 203.245 3 132C3 60.7553 60.7553 3 132 3C203.245 3 261 60.7553 261 132Z" fill="none" stroke="#006411" pathLength="1" stroke-width="6" strokeLinecap="round"/>
                            </svg>}

                            <div className={styles.check}>
                                {(timerState === TIMER_STATES.play || timerState === TIMER_STATES.pause) && countingDirection === COUNTING_DIRECTIONS.counterClockwise &&
                                <>
                                    <span style={{ zIndex: 3, transform: `rotate('90deg')`}} className={styles.time}>
                                        {remainingMinutes.toString().padStart(2, '0')}:{displayRemainingSeconds.toString().padStart(2, '0')}
                                    </span>
                                    
                                </>}
                                
                                
                                {timerState !== TIMER_STATES.init && timerState !== TIMER_STATES.stop && <div className={`${styles[`timer-fill`]} ${timerState === TIMER_STATES.finish ? styles.complete : ''}`}>
                                {timerState === TIMER_STATES.finish &&
                                <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <animated.path className={styles['check-icon']} style={showCheck} d="M7.80453 17.8812L5.54959 20.3573C5.39926 20.0272 4.69271 18.7726 3.06915 16.3955C1.0848 15.0089 0.889373 16.9733 1.0397 18.1288C1.56586 18.8716 2.84366 20.9021 3.74563 23.081C4.64761 25.26 6.45156 22.9985 7.12805 22.0906C6.90255 22.1731 7.39864 21.942 12.0889 16.3955C16.3733 11.6909 18.1773 9.95762 24.9421 3.2721C25.3029 1.09312 23.8898 0.878522 23.1381 1.0436C20.4322 3.60225 14.4341 9.51192 12.0889 12.6814C10.285 14.6622 8.48101 16.9733 7.80453 17.8812Z" stroke="#006411" stroke-width="3"/>
                                </svg>}
                                    </div>}          
                            </div>

                        {timerState === TIMER_STATES.play && countingDirection === COUNTING_DIRECTIONS.clockwise && 
                            <><svg style={{ zIndex: 3}} width="264" height="264" viewBox="0 0 264 264" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <animated.path  className={styles.circle} style={limitHabitsTimerSprings} d="M261 132C261 203.245 203.245 261 132 261C60.7553 261 3 203.245 3 132C3 60.7553 60.7553 3 132 3C203.245 3 261 60.7553 261 132Z" fill="none" stroke={timeElapsed + currentDayResult.progress >= activeHabit.habit.quantity ? "#640011" : "#006411"} pathLength="1" stroke-width="6" strokeLinecap="round"/>
                        </svg>
                        <div className={styles.check}>
                        {(timerState === TIMER_STATES.play || timerState === TIMER_STATES.pause) && countingDirection === COUNTING_DIRECTIONS.clockwise &&
                                <>
                                    <span style={{ zIndex: 3}} className={styles.time}>
                                        {elapsedMinutes.toString().padStart(2, '0')}:{displayElapsedSeconds.toString().padStart(2, '0')}
                                    </span>
                                    
                                </>}
                            
                        </div></>}
                        {timerState !== TIMER_STATES.init && timerState !== TIMER_STATES.stop && <div className={`${styles[`timer-fill`]} ${timeElapsed + currentDayResult.progress >= activeHabit.habit.quantity ? styles.failed : ''} ${timerState === TIMER_STATES.finish ? styles.complete : ''}`}>
                        {(timerState === TIMER_STATES.play || timerState === TIMER_STATES.pause) && countingDirection === COUNTING_DIRECTIONS.clockwise &&
                                <>
                                    <span style={{ zIndex: 3 }} className={styles.time}>
                                        {elapsedMinutes.toString().padStart(2, '0')}:{displayElapsedSeconds.toString().padStart(2, '0')}
                                    </span>
                                    
                                </>}
                            </div>}     
                        {timerState === TIMER_STATES.finish &&
                            isLimitHabitComplete &&
                                <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <animated.path className={styles['check-icon']} style={showCheck} d="M7.80453 17.8812L5.54959 20.3573C5.39926 20.0272 4.69271 18.7726 3.06915 16.3955C1.0848 15.0089 0.889373 16.9733 1.0397 18.1288C1.56586 18.8716 2.84366 20.9021 3.74563 23.081C4.64761 25.26 6.45156 22.9985 7.12805 22.0906C6.90255 22.1731 7.39864 21.942 12.0889 16.3955C16.3733 11.6909 18.1773 9.95762 24.9421 3.2721C25.3029 1.09312 23.8898 0.878522 23.1381 1.0436C20.4322 3.60225 14.4341 9.51192 12.0889 12.6814C10.285 14.6622 8.48101 16.9733 7.80453 17.8812Z" stroke="#006411" stroke-width="3"/>
                                </svg>}
                                {timerState === TIMER_STATES.finish &&
                            isLimitHabitFailed && <animated.svg className={styles['check-icon']} style={showCheck} width="38" height="27" viewBox="0 0 38 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.51674 25.0888C9.46241 13.2137 27.4891 13.1144 35.5341 25.0886" stroke="#641100" stroke-width="3" stroke-linecap="round"/>
                                    <circle cx="7.06109" cy="3.93656" r="3.82145" fill="#641100"/>
                                    <circle cx="29.9898" cy="3.93656" r="3.82145" fill="#641100"/>
                                </animated.svg>}
                              
                    </div>
                    
                </>
                {buttons()}
            </div>
    )
})

export default Timer;