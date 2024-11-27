
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import AuthContext from '../../context/auth';

import User from '../../assets/svg/user.svg';
import Password from '../../assets/svg/password.svg';
import Google from '../../assets/svg/google.svg';
import Facebook from '../../assets/svg/facebook.svg';

import AuthInputBox from './AuthInputBox';
import AuthErrorBox from './AuthErrorBox';
import AuthButton from './AuthButton';
import AuthExternalLoginButton from './AuthExternalLoginButton';

import { PATHS } from '../../constants/paths';

import styles from '../../styles/SignIn.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import axios from 'axios';



const SignIn = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {email, password, errors, emailChange, passwordChange} = useContext(AuthContext);

	const {googleLogin, facebookLogin, handleLoginSubmit} = useAuth();

	
    

	const handleEmailChange = (e) => {
		emailChange(e.target.value);
	}

	const handlePasswordChange = (e) => {
		passwordChange(e.target.value);
	}

    const handleForgetPasswordButtonClick = () => {
        navigate(PATHS.forgetPassword);
    }

    const handleRegisterButtonClick = () => {
        navigate(PATHS.signUp);
    }


    
    return (
        <>
            <span className={styles.label}>Sign In</span>
            <form className={styles.form} onSubmit={handleLoginSubmit}>
				<AuthInputBox icon={User} inputValue={email} onChange={handleEmailChange} placeholder='E-mail' />
				<AuthInputBox icon={Password} inputValue={password} onChange={handlePasswordChange} placeholder='Password' />
				<div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
					<AuthErrorBox errors={errors} />
					<div className={styles['forgot-password-btn']} onClick={handleForgetPasswordButtonClick}>
						<span>Forgot Password?</span>
					</div>
				</div>
				<div className={styles.btns}>
					<AuthButton type='button' onClick={handleRegisterButtonClick} label='Register' />
					<AuthButton type='submit' label='Login' />
				</div>						
			</form>
			<div className={styles['or-with-box']}>
				<div className={styles['line']}></div>
				<span>or</span>
				<div className={styles['line']}></div>
			</div>
			<div className={styles['icons']}>
				<AuthExternalLoginButton onClick={googleLogin} icon={Google} />
				<AuthExternalLoginButton onClick={facebookLogin} icon={Facebook} />
			</div>
        </>
    )
}

export default SignIn;