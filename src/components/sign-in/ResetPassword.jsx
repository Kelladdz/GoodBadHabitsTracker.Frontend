import { useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom"

import { useAuth } from '../../hooks/useAuth';

import AuthInputBox from './AuthInputBox';
import AuthErrorBox from './AuthErrorBox';
import AuthButton from './AuthButton';

import Password from '../../assets/svg/password.svg'

import styles from '../../styles/ResetPassword.module.css'


const ResetPassword = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const token = params.get('token');
    const email = params.get('email');

    const {resetPassword} = useAuth();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState();

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleResetPasswordSubmit = event => {
		event.preventDefault();
		newPassword !== confirmPassword
			? (errors = `Passwords didn't match.`)
			: resetPassword(newPassword, token, email);
	};

    const handleBackButtonClick = () => {
        navigate(PATHS.auth);
    }

    return (
        <>
            <span className={styles.label}>Reset Password</span>
            <p className={styles.paragraph}>Enter a new password</p>
            <form className={styles.form} onSubmit={handleResetPasswordSubmit}>
                <AuthInputBox icon={Password} inputValue={newPassword} onChange={handlePasswordChange} placeholder='New Password' />
				<AuthErrorBox errors={errors} />
                <AuthInputBox icon={Password} inputValue={confirmPassword} onChange={handleConfirmPasswordChange} placeholder='Confirm Password' />
				<AuthErrorBox errors={errors} />
				<div className={styles.btns}>
					<AuthButton type='submit' label='Submit' />
					<AuthButton type='button' onClick={handleBackButtonClick} label='Back' />
				</div>						
			</form>
        </>)
}

export default ResetPassword