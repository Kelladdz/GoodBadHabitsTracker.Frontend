import { useState, useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSpring, animated } from 'react-spring';

import { useUpdateDayResultMutation } from '../../../store';

import HabitContext from '../../../context/habit';
import CalendarContext from '../../../context/calendar';
import TimerContext from '../../../context/timer';

import { CARET_ALTERNATE_LABEL } from '../../../constants/alternate-labels';

import Caret from '../../../assets/svg/caret.svg';

import styles from '../../../styles/Timer.module.css';
import { set } from 'lodash';
import { easeLinear } from 'd3-ease';

const Timer = () => {
    const {activeHabit} = useContext(HabitContext);
    const {currentDateString} = useContext(CalendarContext);
    const {toggleTimer} = useContext(TimerContext);

    const [updateDayResult, isLoading] = useUpdateDayResultMutation();

    const [showOptions, setShowOptions] = useState(false);
    const [duration, setDuration] = useState(5);
    const [seconds, setSeconds] = useState(300);
    const [posibilities, setPosibilities] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const [remainingTime, setRemainingTime] = useState(duration);
    const [countingCompleted, setCountingCompleted] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    
    const btnRef = useRef();
    const dropdownRef = useRef();
    const ref = useRef();

    const circleLength = ref.current ? ref.current.getTotalLength() : 0;
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    const currentDayResult = activeHabit.dayResults.find(result => result.date === currentDateString);

    const handleStartClick = () => {
        setIsStarted(true);
        setDrawing(true);
    }

    const handlePauseClick = () => {
        setIsPaused(trued);
        setDrawing(false);
    }

    const handleCloseClick = async () => {
        let request;
        if (timeElapsed >= activeHabit.quantity) {
            request = {
                id: activeHabit.id,
                index: activeHabit.dayResults.findIndex(result => result.date === currentDateString),
                date: currentDateString,
                progress: timeElapsed,
                status: 0
            }
        } else {
            request = {
                id: activeHabit.id,
                index: activeHabit.dayResults.findIndex(result => result.date === currentDateString),
                date: currentDateString,
                progress: currentDayResult.progress + timeElapsed,
                status: 3
            }
        }
        try {
            await updateDayResult(request).unwrap();
        } catch (error) {
            throw new Error(error);
        } finally {
            setSeconds(300);
            setCountingCompleted(false);
            setDrawing(false);
            setIsPaused(true);
            toggleTimer(false);
        }
    }

    const handleStopClick = async () => {
        setIsStarted(false);
        setDrawing(false);
    }

    const handleCancelClick = () => {
        setSeconds(300);
        setCountingCompleted(false);
        setDrawing(false);
        setIsPaused(true);
        toggleTimer(false);
    }

    const handleDropdownClick = () => {
        if (!showOptions) {
            setShowOptions(true);
        }
        
    }

    const handleDurationSelect = (time) => {
        setDuration(time);
        setSeconds(time * 60);
        setShowOptions(false);
    }

    const buttons = () => {
        if (!countingCompleted && !drawing) {
            return (
                <div className={styles.btns}>
                    <button className={styles.btn} onClick={handleStartClick}>Start</button>
                    <button className={styles.btn} onClick={handleCancelClick}>Cancel</button>
                </div>
            )
        } else if (drawing) {
            return (
                <div className={styles.btns}>
                    <button className={styles.btn} onClick={handlePauseClick}>Pause</button>
                    {isStarted && (<div className={styles.btn} onClick={handleStopClick}>Stop</div>)}
                </div>
            )
        } else if (countingCompleted) {
            return (
                <button className={styles.btn} onClick={handleCloseClick}>Close</button>
            )
        }
    }
 
    const fade = useSpring({
        from: { 
            strokeDashoffset: 0, 
            strokeDasharray: circleLength
        }, 
        to: {
            strokeDashoffset: -circleLength,
            strokeDasharray: circleLength
        },
        config: { 
            duration: duration * 60000,
            precision: 0.0001
        },
        pause: isPaused && !drawing,
        reset: seconds === duration * 60,
        onStart: () => {
            setDrawing(true);
            setIsPaused(false);
        },
        onRest: () => {
            setDrawing(false);
            setCountingCompleted(true);
            setIsStarted(false);
            
        },
    });

    const showCheck = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: countingCompleted ? 1 : 0
        },
        config: {
            duration: 750
        }
    
    })

    useEffect(() => {
        if (isPaused) {
            setDrawing(false)
        } else {
            setDrawing(true);
        }
    }, [isPaused])

    useEffect(() => {
        let countingInterval
        if (drawing) {
            countingInterval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
                setTimeElapsed(prevTime => prevTime + 1);
            }, 1000);
        } else if (!drawing && seconds !== 0) {
            clearInterval(countingInterval);
        }
        return () => {
            clearInterval(countingInterval);
        } 

    },[seconds, drawing]);

    useEffect(() => {
        setPosibilities([1]);
        for (let i = 5; i <= activeHabit.quantity / 60; i += 5) {
            setPosibilities(prevPosibilities => [...prevPosibilities, i]);
        }
 } ,[])

    return (
        <>{createPortal(
                <div className={styles.timer}>
                {!countingCompleted ? 
                    <>
                        <span className={styles['primary-label']}>
                            Select duration
                        </span>
                        <div ref={btnRef} className={styles.dropdown} onClick={handleDropdownClick}>
                            <span className={styles.option}>{duration} min</span>
                            <img className={styles.icon} src={Caret} alt={CARET_ALTERNATE_LABEL} />
                        </div>
                        
                        {showOptions && <ul ref={dropdownRef} className={styles['dropdown-content']}>
                            {posibilities.map(posibility => {
                                return <li key={posibility} className={styles.item} onClick={() => handleDurationSelect(posibility)}>{posibility} min</li>
                                })
                            }
                        </ul>}
                    </>
                    :
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <span className={styles['primary-label']}>Session Complete</span>
                        <span className={styles['secondary-label']}>{duration} minutes has been logged for {activeHabit.name}</span>
                    </div>
                }
                
                {(isStarted || countingCompleted) && <div className={styles.counter}>
                    <svg style={{transform: 'rotateX(180deg)', zIndex: 3}} width="264" height="264" viewBox="0 0 264 264" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <animated.path ref={ref} className={styles.circle} style={fade} d="M261 132C261 203.245 203.245 261 132 261C60.7553 261 3 203.245 3 132C3 60.7553 60.7553 3 132 3C203.245 3 261 60.7553 261 132Z" fill="none" stroke="#006411" stroke-width="6" strokeLinecap="round"/>
                    </svg>

                    <div className={styles.check}>
                        {!countingCompleted ? 
                            isStarted && <span className={styles.time}>
                                {minutes.toString().padStart(2, '0')}:{displaySeconds.toString().padStart(2, '0')}
                            </span> 
                            : 
                            <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <animated.path className={styles['check-icon']} style={showCheck} d="M7.80453 17.8812L5.54959 20.3573C5.39926 20.0272 4.69271 18.7726 3.06915 16.3955C1.0848 15.0089 0.889373 16.9733 1.0397 18.1288C1.56586 18.8716 2.84366 20.9021 3.74563 23.081C4.64761 25.26 6.45156 22.9985 7.12805 22.0906C6.90255 22.1731 7.39864 21.942 12.0889 16.3955C16.3733 11.6909 18.1773 9.95762 24.9421 3.2721C25.3029 1.09312 23.8898 0.878522 23.1381 1.0436C20.4322 3.60225 14.4341 9.51192 12.0889 12.6814C10.285 14.6622 8.48101 16.9733 7.80453 17.8812Z" stroke="#006411" stroke-width="3"/>
                            </svg>
                        }
                    </div>


                    <div className={`${styles[`timer-fill`]} ${countingCompleted ? styles.complete : ''}`}>
                
                    </div>
                    

                </div>}
                {buttons()}
        </div>, document.querySelector('.modal-container'))}</>
    )
}

export default Timer;