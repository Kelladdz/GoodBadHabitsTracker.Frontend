import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import {jwtDecode} from "jwt-decode";

import { toggleEmailError, togglePasswordError, toggleUserNameError } from "../store/slices/registerSlice";
import { login, logout } from "../store/slices/authSlice";

import AuthContext from "../context/auth";

import { Pkce } from "../utils/pkce";
import { PATHS } from "../constants/paths";



export function useAuth() {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const registerForm = useSelector(state => state.register);
	const userFingerprint = useSelector(state => state.auth.userFingerprint);

    const {email, password, loginErrors, changeEmail, changePassword, toggleErrors} = useContext(AuthContext);

	const [cookie, setCookie] = useState(Cookies.get(userFingerprint));
	

	

		
    const handleLoginSubmit = async (e) => {
		e.preventDefault();
        let errorData = '';
		await axios.post(import.meta.env.VITE_REACT_APP_LOGIN_LOCALHOST_URL,
				{
					email,
					password
				},
				{ withCredentials: true }
			)
			.then(res => {
				
				if (res.status === 200) {
					dispatch(login(res.data));
				} 
			})
			.catch(errs => {
				console.log(errs);
				if (errs.status === 401) {
					errorData = 'Invalid email or password';
					toggleErrors(errorData);
				}
			});
        
	};
    

    const handleRegisterSubmit = async (e) => {
		e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            dispatch(toggleEmailError('Invalid email'));
        }

        if (registerForm.userName === '') {
            dispatch(toggleUserNameError('Username cannot be empty'));
        }

        if (registerForm.password !== registerForm.confirmPassword) {
            dispatch(togglePasswordError('Passwords do not match'));
        }
		await axios
			.post(import.meta.env.VITE_REACT_APP_LOCALHOST_REGISTER_URL, {
				userName: registerForm.userName,
                email: registerForm.email,
                password: registerForm.password,
                confirmPassword: registerForm.confirmPassword
			})
			.then(res => {
				console.log(res);
				if (res.status === 201) {
					navigate(PATHS.auth);
				}
			})
			.catch(errs => {
				console.log(errs);
				for (let err of errs.response.data) {
					if (err.errors.contains('Failed to create user'))
						toggleErrors(() => {
							if (err.errors.contains('Username')) return `This name is already taken.`;
						});
					else if (err.code === 'DuplicateEmail')
						toggleErrors(() => {
							if (err.errors.contains('Email')) return `This email is already taken.`;
						});
				}
			});
    }

	const sendResetPasswordLink = async (email) => {
		await axios
			.post(import.meta.env.VITE_REACT_APP_FORGET_PASSWORD_LOCALHOST_URL, {
				email,
			})
			.then(res => {
				console.log(res);
				if (res.status === 200) {
					navigate(PATHS.forgetPasswordConfirmEmail);
				}
			})
			.catch(errs => {
				console.log(errs);
				if (errs.status === 401) {
					toggleErrors('Invalid email');
				}
			});
	}

	const resetPassword = async (password, token, email) => {
		await axios
			.patch(import.meta.env.VITE_REACT_APP_RESET_PASSWORD_LOCALHOST_URL, {
				password,
				token,
				email,
			})
			.then(res => {
				console.log(res);
				if (res.status === 204) {
					navigate(PATHS.auth);
				}
			});
	};

	const newRefreshToken = async () => {
		await axios
			.post(import.meta.env.VITE_REACT_APP_REFRESH_TOKEN_LOCALHOST_URL,
				{
					accessToken: localStorage.getItem('accessToken'),
					refreshToken: localStorage.getItem('refreshToken'),
				},
				{ withCredentials: true }
			)
			.then(res => {
				if (res.status === 200) {
					dispatch(login(res.data));
				}
			})
			.catch(errs => {
				console.log(errs);
				if (errs.status === 401) {
					errorData = 'Something goes wrong';
					dispatch(logout());
				}
			});
	}

	const accessTokenCheck = async () => {
		const expiresIn = jwtDecode(localStorage.getItem('accessToken')).exp;
		if (expiresIn !== null) {
			if (expiresIn < Date.now().valueOf() / 1000) {
				newRefreshToken();
			}
		}
	}

	const checkCookie = () => {
		const currentCookie = Cookies.get('__Secure-Fgp');
		if (currentCookie !== cookie) {
			setCookie(currentCookie);
		}
	};

	

    const googleLogin = async res => {
		const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;
		const redirectUri = import.meta.env.VITE_REACT_APP_GOOGLE_CALLBACK_LOCALHOST_URL;
		const scope = 'openid profile email offline_access';
		const audience = import.meta.env.VITE_REACT_APP_AUTH0_AUDIENCE;
		const stateParameter = Pkce.stateParameterGenerator();
		console.log(stateParameter);
		const codeVerifier = Pkce.codeVerifierGenerator();
		console.log(codeVerifier);
		localStorage.setItem('codeVerifier', codeVerifier);
		const codeChallenge = await Pkce.codeChallengeGeneratorAsync(codeVerifier);
		console.log(codeChallenge);

		window.open(
			`https://${import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN}/authorize?response_type=code&audience=${audience}&access_type=offline&connection=google-oauth2&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=S256`,
			'_blank',
			'width=500,height=600'
		);
	};

	const facebookLogin = async res => {
		const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;
		const redirectUri = import.meta.env.VITE_REACT_APP_FACEBOOK_CALLBACK_LOCALHOST_URL;
		const scope = 'openid profile email offline_access';
		const audience = import.meta.env.VITE_REACT_APP_AUTH0_AUDIENCE;
		const stateParameter = Pkce.stateParameterGenerator();
		console.log(stateParameter);
		const codeVerifier = Pkce.codeVerifierGenerator();
		console.log(codeVerifier);
		localStorage.setItem('codeVerifier', codeVerifier);
		const codeChallenge = await Pkce.codeChallengeGeneratorAsync(codeVerifier);
		console.log(codeChallenge);

		window.open(
			`https://${import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN}/authorize?response_type=code&audience=${audience}&access_type=offline&connection=facebook&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}}&code_challenge=${codeChallenge}&code_challenge_method=S256`,
			'_blank',
			'width=500,height=600'
		);
	};

	// useEffect(() => {
	// 	if (userFingerprint && userFingerprint.length > 0) {
	// 		navigate(PATHS.main);
	// 	} else {
	// 		navigate(PATHS.auth);
	// 	}
	// },[userFingerprint, navigate]);

	// useEffect(() => {
	// 	const userCookie = () => {
	// 		return Cookies.get('__Secure-Fgp');
	// 	};
	// 	console.log(userCookie());
	// 	if (userCookie() !== undefined) {
	// 		navigate(PATHS.main);
	// 	}
	// },[]);

	// useEffect(() => {
	// 	const checkCookie = () => {
	// 		const currentCookie = Cookies.get('__Secure-Fgp');
	// 		if (currentCookie !== cookie) {
	// 			setCookie(currentCookie);
	// 		}
	// 	};

	// 	const intervalId = setInterval(checkCookie, 1000);

	// 	return () => clearInterval(intervalId);
	// }, [cookie]);

	


    return {email, password, loginErrors, changeEmail, changePassword, toggleErrors, cookie, checkCookie, handleLoginSubmit, handleRegisterSubmit, sendResetPasswordLink, resetPassword, accessTokenCheck, googleLogin, facebookLogin};
}