import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {jwtDecode} from "jwt-decode";

import { loginSuccess, loginFail, signUpFail, logout, getExternalTokens, sendResetPasswordLinkFailed } from "../store/slices/authSlice";

import AuthContext from "../context/auth";

import { Pkce } from "../utils/authUtils";
import { PATHS } from "../constants/paths";
import { useAuthValidation } from "./useAuthValidation";
import { toggleUserNameError, toggleEmailError, togglePasswordError, toggleConfirmPasswordError } from "../store";
import { logoutAction } from "../store/actions/authActions";



export function useAuth() {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const registerForm = useSelector(state => state.register);
	const authState = useSelector(state => state.auth);
	const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
	const signUpError = useSelector(state => state.auth.signUpError);

    const {email, password, loginErrors, changeEmail, changePassword, toggleErrors, toggleProfile} = useContext(AuthContext);
	const {isRegisterFormValid} = useAuthValidation();
    const login = async (request) => {
		try {
			const response = await axios.post(
				import.meta.env.VITE_REACT_APP_LOGIN_LOCALHOST_URL, request,
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				});

			const {error, data} = response;
			if (error) {
				dispatch(loginFail(error));
			} else {
				const {accessToken} = data;

				const userData = {
					userId: jwtDecode(accessToken).sub,
					email: jwtDecode(accessToken).email,
				}
				const profile = {
					userData,
					accessToken
				};
				localStorage.setItem("profile", JSON.stringify(profile));
				dispatch(loginSuccess(profile));
				navigate(PATHS.main);
			}
		} catch (error) {
			dispatch(loginFail(error));
		}
	}
    

    const register = async () => {
		if(isRegisterFormValid(registerForm)){
			await axios.post(import.meta.env.VITE_REACT_APP_REGISTER_LOCALHOST_URL,
						registerForm,
						{
							headers: {
								'Content-Type': 'application/json',
							},
							withCredentials: true,
						})
				.then(res => {
					console.log(res);
					if (res.status === 201) {
						navigate(PATHS.signUpConfirmEmail);
					}
				})
				.catch(errs => {
					console.log(errs);
					if (errs.status === 400) {
						const errors = errs.response.data.errors.map(error => {
							return {property: error.propertyName, error: error.errorMessage};
						})
						dispatch(signUpFail(errors));
					}});
		} 
		
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
				if (errs.status === 400) {
					console.log(errs.response.data.errors[0]);
					const error = {property: errs.response.data.errors[0].propertyName, error: errs.response.data.errors[0].errorMessage};
					dispatch(sendResetPasswordLinkFailed(error));
				}});
	}

	const resetPassword = async (email, token, password) => {
		await axios
			.patch(import.meta.env.VITE_REACT_APP_RESET_PASSWORD_LOCALHOST_URL, {
				password,
				token,
				email,
			},{
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				},
				withCredentials: true,
			})
			.then(res => {
				console.log(res);
				if (res.status === 204) {
					navigate(PATHS.auth);
				}
			});
	};

	const signOut = async () => {
		// await axios.post(import.meta.env.VITE_REACT_APP_LOGOUT_LOCALHOST_URL, {},
		// 	{ 
		// 		withCredentials: true, 
		// 		headers: { 
		// 		'Authorization': `Bearer ${accessToken}`
		// 	} }
			
		// )
		// 	.then(res => {
		// 		console.log(res);
		// 		if (res.status === 204) {
		// 			localStorage.removeItem("profile");
					
		// 			navigate(PATHS.auth);
		// 			dispatch(logout());
		// 		}
		// 	});
		logoutAction();
	}

	

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

		window.location.href = `https://${import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN}/authorize?response_type=code&audience=${audience}&access_type=offline&connection=google-oauth2&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
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

		window.location.href = `https://${import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN}/authorize?response_type=code&audience=${audience}&access_type=offline&connection=facebook&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
	};

	const tokenRequest = async (code, provider, codeVerifier) => {
		await axios
			.post(
				`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN_LOCALHOST_URL}?provider=${provider}`,
				{
					grantType: 'authorization_code',
					code: code,
					redirectUri: provider === 'Google' ? import.meta.env.VITE_REACT_APP_GOOGLE_CALLBACK_LOCALHOST_URL : import.meta.env.VITE_REACT_APP_FACEBOOK_CALLBACK_LOCALHOST_URL,
					clientId: import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID,
					codeVerifier: codeVerifier,
				},
				{ withCredentials: true, headers: { 'content-type': 'application/json' } }
			)
			.then(res => {
				console.log(res);
				if (res.status === 200) {
					dispatch(getExternalTokens(res.data));
				}
			});
	};

	const externalLogin = async () => {
			await axios
				.post(import.meta.env.VITE_REACT_APP_EXTERNAL_LOGIN_LOCALHOST_URL,
					{
						accessToken: authState.accessToken,
						expiresIn: authState.expiresIn,
						scope: authState.scope,
						idToken: authState.idToken,
						refreshToken: authState.refreshToken,
						provider: authState.provider,
					},
					{ 
						withCredentials: true, 
						headers: { 
						'content-type': 'application/json'
					} }
				)
				.then(res => {
					console.log(res);
					if (res.status === 200) {
						
						localStorage.removeItem('codeVerifier');
						const userData = {
							userId: res.data,
							email: jwtDecode(authState.idToken)?.email,
						}
						const profile = {
							userData: userData,
							accessToken: authState.accessToken,
							idToken: authState.idToken,
							refreshToken: authState.refreshToken,
							expiresIn: authState.expiresIn,
							scope: authState.scope,
							provider: authState.provider,
						}
						localStorage.setItem('profile', JSON.stringify(profile));
						dispatch(loginSuccess({userData, accessToken: authState.accessToken, refreshToken: authState.refreshToken}));
						navigate(PATHS.main);
					}
				})
				.catch(errs => {
					console.log(errs);
					if (errs.response.status === 401)
						errorData = 'Invalid email or password';
				});
	};

	const deleteAccount = async () => {
		await axios
			.delete(import.meta.env.VITE_REACT_APP_DELETE_ACCOUNT_LOCALHOST_URL, {
				headers: {
					'Authorization': `Bearer ${authState.accessToken}`,
				},
				withCredentials: true,
			})
			.then(res => {
				console.log(res);
				if (res.status === 204) {
					dispatch(logout());
					navigate(PATHS.auth);
				}
			});
	}

	useEffect(() => {
		if (signUpError.length > 0) {
			signUpError.forEach(error => {
				switch(error.property) {
					case 'UserName':
						dispatch(toggleUserNameError(error.error));
						break;
					case 'Username':
						dispatch(toggleUserNameError(error.error));
						break;
					case 'Email':
						dispatch(toggleEmailError(error.error));
						break;
					case 'Password':
						dispatch(togglePasswordError(error.error));
						break;
					case 'ConfirmPassword':
						dispatch(toggleConfirmPasswordError(error.error));
						break;
					default:
						break;
				} 
			});
		}
	},[signUpError]);

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

	


    return {email,  tokenRequest, externalLogin, password, loginErrors, changeEmail, changePassword, toggleErrors, login, register, sendResetPasswordLink, resetPassword, signOut, googleLogin, facebookLogin, deleteAccount};
}