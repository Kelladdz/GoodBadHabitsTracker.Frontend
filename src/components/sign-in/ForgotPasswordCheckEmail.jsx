import { useNavigate } from 'react-router-dom';

import AuthButton from './AuthButton'

import { PATHS } from "../../constants/paths";

import styles from '../../styles/ForgotPasswordCheckEmail.module.css'

const ForgotPasswordCheckEmail = () => {
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(PATHS.auth);
    }

    return (
        <>
            <span className={styles.label}>Check your mailbox!</span>
            <p className={styles.paragraph}>We have sent a password recovery link to your email address. Please check your mailbox and follow the instructions.</p>
            <div style={{position: 'absolute', bottom: '2rem', width: '20rem', display: 'flex', justifyContent: 'center'}}>
                <AuthButton type='button' onClick={handleBackButtonClick} label='Back' />
            </div> 
        </>)
}

export default ForgotPasswordCheckEmail