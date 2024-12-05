import { useContext, useState } from 'react';

import { useAuth } from "../../hooks/useAuth";

import { PATHS } from "../../constants/paths";

import Email from '../../assets/svg/email.svg'
import AuthErrorBox from "./AuthErrorBox";
import AuthInputBox from "./AuthInputBox";
import AuthButton from "./AuthButton";

import styles from '../../styles/ForgetPassword.module.css'
import { useNavigate } from "react-router-dom";
import AuthContext from '../../context/auth';

const ForgetPassword = () => {
    const navigate = useNavigate();

    const {errors} = useContext(AuthContext);

    const {sendResetPasswordLink} = useAuth();
    
    const [emailForgot, setEmailForgot] = useState('');

    
    const handleEmailChange = (e) => {
        setEmailForgot(e.target.value);
    }

    const handleForgetPasswordSubmit = (e) => {
        e.preventDefault();
        sendResetPasswordLink(emailForgot);
    }

    const handleBackButtonClick = () => {
        navigate(PATHS.auth);
    }
    
    return (
        <>
            <span className={styles.label}>Forgot something?</span>
            <form className={styles.form} onSubmit={handleForgetPasswordSubmit}>
                <AuthInputBox type='text' icon={Email} inputValue={emailForgot} onChange={handleEmailChange} placeholder='E-mail' />
				<AuthErrorBox errors={errors} />
				<div className={styles.btns}>
					<AuthButton type='submit' label='Submit' />
					<AuthButton type='button' onClick={handleBackButtonClick} label='Back' />
				</div>						
			</form>
        </>)
}

export default ForgetPassword