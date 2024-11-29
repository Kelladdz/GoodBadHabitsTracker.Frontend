
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import { useAuth } from '../../hooks/useAuth';

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

const SignIn = () => {
	const navigate = useNavigate();

	const signInError = useSelector(state => state.auth?.signInError);

	const [loading, setLoading] = useState(false);
	const [loadingText, setLoadingText] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const {googleLogin, facebookLogin, login} = useAuth();
    
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	}

    const handleForgetPasswordButtonClick = () => {
        navigate(PATHS.forgetPassword);
    }

    const handleRegisterButtonClick = () => {
        navigate(PATHS.signUp);
    }

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		const request = {
			email,
			password
		}
		const timeout = setTimeout(() => {
			setLoadingText(
			  "This is taking longer than usual. Please wait while backend services are getting started."
			);
		  }, 5000);
		login(request);
		setLoading(false);
    	clearTimeout(timeout);
	}

	useEffect(() => {
		const userCookie = () => {
			if (Cookies.get('__Secure-Fgp')) {
				return Cookies.get('__Secure-Fgp');
		}
	}
		console.log(userCookie());
		if (userCookie() !== undefined) {
			navigate(PATHS.main);
		}
	});

    
    return (
        <>
            <span className={styles.label}>Sign In</span>
            <form className={styles.form} onSubmit={handleLoginSubmit}>
				<AuthInputBox icon={User} inputValue={email} onChange={handleEmailChange} placeholder='E-mail' />
				<AuthInputBox icon={Password} inputValue={password} onChange={handlePasswordChange} placeholder='Password' />
				<div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
					{signInError && <AuthErrorBox error={signInError} />}
					{loadingText !== '' && <AuthErrorBox error={loadingText} />}
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