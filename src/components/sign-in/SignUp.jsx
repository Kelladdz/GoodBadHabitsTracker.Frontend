import { useSelector, useDispatch } from "react-redux"

import {changeUserName, changeEmail, changePassword, changeConfirmPassword} from '../../store'

import { useAuth } from "../../hooks/useAuth";

import { PATHS } from "../../constants/paths";

import User from '../../assets/svg/user.svg'
import Email from '../../assets/svg/email.svg'
import Password from '../../assets/svg/password.svg'
import AuthErrorBox from "./AuthErrorBox";
import AuthInputBox from "./AuthInputBox";
import AuthButton from "./AuthButton";

import styles from '../../styles/SignUp.module.css'
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registerForm = useSelector(state => state.register);

    const {register} = useAuth();

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
            <form className={styles.form} onSubmit={handleRegisterSubmit}>
				<AuthInputBox type='text' icon={User} inputValue={registerForm.userName} onChange={handleUserNameChange} placeholder='User Name' />
                <AuthErrorBox errors={registerForm.userNameError} />
                <AuthInputBox type='text' icon={Email} inputValue={registerForm.email} onChange={handleEmailChange} placeholder='E-mail' />
				<AuthErrorBox errors={registerForm.emailError} />
                <AuthInputBox type='password' icon={Password} inputValue={registerForm.password} onChange={handlePasswordChange} placeholder='Password' />
				<AuthErrorBox errors={registerForm.passwordError} />
                <AuthInputBox type='password' icon={Password} inputValue={registerForm.confirmPassword} onChange={handleConfirmPasswordChange} placeholder='Confirm Password' />
                <AuthErrorBox errors={registerForm.passwordError} />
				<div className={styles.btns}>
					<AuthButton type='submit' label='Register' />
					<AuthButton type='button' onClick={handleBackButtonClick} label='Back' />
				</div>						
			</form>
        </>)
}

export default SignUp