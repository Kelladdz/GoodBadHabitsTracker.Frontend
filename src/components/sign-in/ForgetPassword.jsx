import { useContext, useEffect, useState } from 'react';

import { useAuth } from "../../hooks/useAuth";

import { PATHS } from "../../constants/paths";

import Email from '../../assets/svg/email.svg'
import AuthErrorBox from "./AuthErrorBox";
import AuthInputBox from "./AuthInputBox";
import AuthButton from "./AuthButton";

import styles from '../../styles/ForgetPassword.module.css'
import { useNavigate } from "react-router-dom";
import AuthContext from '../../context/auth';
import { useAuthValidation } from '../../hooks/useAuthValidation';
import { useSelector } from 'react-redux';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const forgetPasswordError = useSelector(state => state.auth?.forgetPasswordError);
    const {sendResetPasswordLink} = useAuth();
    const {isEmailValid} = useAuthValidation();

    const [emailForgot, setEmailForgot] = useState('');
    const [error, setError] = useState();

    
    const handleEmailChange = (e) => {
        setEmailForgot(e.target.value);
    }

    const handleForgetPasswordSubmit = (e) => {
        e.preventDefault();
        if (isEmailValid(emailForgot)) {
            sendResetPasswordLink(emailForgot);
        } else {
            setError('Invalid email');
        }
    }

    const handleBackButtonClick = () => {
        navigate(PATHS.auth);
    }
    
    useEffect(() => {
        if (forgetPasswordError) {
            setError(forgetPasswordError.error);
        }
    }, [forgetPasswordError])
    return (
        <>
            <span className={styles.label}>Forgot something?</span>
            <form className={styles.form} onSubmit={handleForgetPasswordSubmit}>
                <AuthInputBox type='text' icon={Email} inputValue={emailForgot} onChange={handleEmailChange} placeholder='E-mail' />
				<AuthErrorBox error={error} />
				<div className={styles.btns}>
					<AuthButton type='submit' label='Submit' />
					<AuthButton type='button' onClick={handleBackButtonClick} label='Back' />
				</div>						
			</form>
        </>)
}

export default ForgetPassword