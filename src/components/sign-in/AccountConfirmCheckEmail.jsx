import { useNavigate } from 'react-router-dom';

import AuthButton from './AuthButton'

import { PATHS } from "../../constants/paths";

import styles from '../../styles/AccountConfirmCheckEmail.module.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signUpSuccess } from '../../store';

const AccountConfirmCheckEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(PATHS.auth);
    }

    useEffect(() => {
        dispatch(signUpSuccess());
    },[])

    return (
        <>
            <span className={styles.label}>Check your mailbox!</span>
            <p className={styles.paragraph}>We have sent a account confirmation to your email address. Please check your mailbox and follow the instructions.</p>
            <div style={{position: 'absolute', bottom: '2rem', width: '20rem', display: 'flex', justifyContent: 'center'}}>
                <AuthButton type='button' onClick={handleBackButtonClick} label='Back' />
            </div> 
        </>)
}

export default AccountConfirmCheckEmail