import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

import {changeUserName, changeEmail, changePassword, changeConfirmPassword} from '../../store'

import { useAuth } from "../../hooks/useAuth";
import { useAuthValidation } from "../../hooks/useAuthValidation";

import AuthErrorBox from "./AuthErrorBox";
import AuthInputBox from "./AuthInputBox";
import AuthButton from "./AuthButton";
import PasswordRequirement from "./PasswordRequirement";

import { PATHS } from "../../constants/paths";
import { CANCEL_ICON_ALTERNATE_LABEL, CHECK_ICON_ALTERNATE_LABEL } from "../../constants/alternate-labels";

import User from '../../assets/svg/user.svg'
import Email from '../../assets/svg/email.svg'
import Password from '../../assets/svg/password.svg'

import styles from '../../styles/SignUp.module.css'

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registerForm = useSelector(state => state.register);

    const {register} = useAuth();
    const {hasPasswordAtLeastSixChars, hasPasswordAtLeastOneNonAlphanumericChar, hasPasswordAtLeastOneLowercaseChar, hasPasswordAtLeastOneUppercaseChar, isValid} = useAuthValidation();

    const handleUserNameChange = (e) => {
        dispatch(changeUserName(e.target.value));
    }

    const handleEmailChange = (e) => {
        dispatch(changeEmail(e.target.value));
    }

    const handlePasswordChange = (e) => {
        dispatch(changePassword(e.target.value));
    }

    const handleConfirmPasswordChange = (e) => {
        dispatch(changeConfirmPassword(e.target.value));
    }

    const handleBackButtonClick = () => {
        navigate(PATHS.auth);
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log(registerForm);
        
            register();
        
    }
    
    return (
        <>
            <span className={styles.label}>Sign Up</span>
            <form autoComplete='off' className={styles.form} onSubmit={handleRegisterSubmit}>
				<AuthInputBox autoComplete='off' name='userName' type='text' icon={User} inputValue={registerForm.userName} onChange={handleUserNameChange} placeholder='User Name' />
                <AuthErrorBox error={registerForm.userNameError} />
                <AuthInputBox autoComplete='off' name='new-email' type='text' icon={Email} inputValue={registerForm.email} onChange={handleEmailChange} placeholder='E-mail' />
				<AuthErrorBox error={registerForm.emailError} />
                <AuthInputBox autoComplete='off' name='new-password' type='password' icon={Password} inputValue={registerForm.password} onChange={handlePasswordChange} placeholder='Password' />
				<AuthErrorBox error={registerForm.passwordError} />
                <AuthInputBox autoComplete='off' name='confirm-password' type='password' icon={Password} inputValue={registerForm.confirmPassword} onChange={handleConfirmPasswordChange} placeholder='Confirm Password' />
                <AuthErrorBox error={registerForm.confirmPasswordError} />
				<div className={styles.btns}>
					<AuthButton type='submit' label='Register' />
					<AuthButton type='button' onClick={handleBackButtonClick} label='Back' />
				</div>						
			</form>
            
            <div className={styles['password-requirments']}>
                    <span className={styles['password-requirments-title']}>Password must to:</span>
                    <PasswordRequirement requirment='Be at least 6 characters long' isValid={hasPasswordAtLeastSixChars(registerForm.password)}  />
                    <PasswordRequirement requirment='Have at least one non alphanumeric character' isValid={hasPasswordAtLeastOneNonAlphanumericChar(registerForm.password)}  />
                    <PasswordRequirement requirment='Have at least one lowercase' isValid={hasPasswordAtLeastOneLowercaseChar(registerForm.password)}  />
                    <PasswordRequirement requirment='Have at least one uppercase' isValid={hasPasswordAtLeastOneUppercaseChar(registerForm.password)}  />
            </div>
        </>)
}

export default SignUp