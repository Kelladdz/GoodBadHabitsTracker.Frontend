import { useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '../../hooks/useAuth';
import { useAuthValidation } from '../../hooks/useAuthValidation';

import AuthInputBox from './AuthInputBox';
import AuthErrorBox from './AuthErrorBox';
import AuthButton from './AuthButton';
import PasswordRequirement from './PasswordRequirement';

import { PATHS } from '../../constants/paths';

import Password from '../../assets/svg/password.svg'

import styles from '../../styles/ResetPassword.module.css'
import { toggleConfirmPasswordError,togglePasswordError } from '../../store';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const token = params.get('token');
    const email = params.get('email');

    const passwordError = useSelector(state => state.auth?.passwordError);
    const confirmPasswordError = useSelector(state => state.auth?.confirmPasswordError);


    const {resetPassword} = useAuth();
    const {isPasswordsMatch, hasPasswordAtLeastSixChars, hasPasswordAtLeastOneNonAlphanumericChar, hasPasswordAtLeastOneLowercaseChar, hasPasswordAtLeastOneUppercaseChar} = useAuthValidation();

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
        if (!hasPasswordAtLeastSixChars(newPassword) || !hasPasswordAtLeastOneNonAlphanumericChar(newPassword) || !hasPasswordAtLeastOneLowercaseChar(newPassword) || !hasPasswordAtLeastOneUppercaseChar(newPassword)){
            dispatch(togglePasswordError('Invalid password'))
        }
		isPasswordsMatch(newPassword, confirmPassword) 
        ? resetPassword(email, token, newPassword) 
        : dispatch(toggleConfirmPasswordError(`Passwords doesn't match`));
	};

    const handleBackButtonClick = () => {
        navigate(PATHS.auth);
    }

    return (
        <>
            <span className={styles.label}>Reset Password</span>
            <p className={styles.paragraph}>Enter a new password</p>
            <form className={styles.form} onSubmit={handleResetPasswordSubmit}>
                <AuthInputBox type='password' icon={Password} inputValue={newPassword} onChange={handlePasswordChange} placeholder='New Password' />
				<AuthErrorBox error={passwordError} />
                <AuthInputBox type='password' icon={Password} inputValue={confirmPassword} onChange={handleConfirmPasswordChange} placeholder='Confirm Password' />
				<AuthErrorBox error={confirmPasswordError} />
				<div className={styles.btns}>
					<AuthButton type='submit' label='Submit' />
					<AuthButton type='button' onClick={handleBackButtonClick} label='Back' />
				</div>						
			</form>
            <div className={styles['password-requirments']}>
                    <span className={styles['password-requirments-title']}>Password must to:</span>
                    <PasswordRequirement requirment='Be at least 6 characters long' isValid={hasPasswordAtLeastSixChars(newPassword)}  />
                    <PasswordRequirement requirment='Have at least one non alphanumeric character' isValid={hasPasswordAtLeastOneNonAlphanumericChar(newPassword)}  />
                    <PasswordRequirement requirment='Have at least one lowercase' isValid={hasPasswordAtLeastOneLowercaseChar(newPassword)}  />
                    <PasswordRequirement requirment='Have at least one uppercase' isValid={hasPasswordAtLeastOneUppercaseChar(newPassword)}  />
            </div>
        </>)
}

export default ResetPassword