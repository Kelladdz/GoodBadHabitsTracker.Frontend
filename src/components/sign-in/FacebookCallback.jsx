import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import qs from 'qs';

import { getExternalTokens } from "../../store/slices/authSlice";


const FacebookCallback = () => {
    let location = useLocation();
	let searchParams = new URLSearchParams(location.search);

    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth);

	let code = searchParams.get('code');
	let codeVerifier = localStorage.getItem('codeVerifier');
    let accessToken = localStorage.getItem('accessToken');

    const tokenRequest = async () => {
		if (accessToken === '') {
			await axios
				.post(
					'https://localhost:7154/api/auth/token?provider=Facebook',
					{
						grantType: 'authorization_code',
						code: code,
						redirectUri: 'https://localhost:8080/facebook-callback',
						clientId: 'cNRB11SQnB796najkgVTLftkwgkdtNL5',
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
		}
	};

    const externalLogin = async () => {
		if (accessToken !== '') {
			await axios
				.post(
					'https://localhost:7154/api/auth/external-login',
					{
						accessToken: userData.accessToken,
						expiresIn: userData.expiresIn,
						scope: userData.scope,
						idToken: userData.idToken,
						refreshToken: userData.refreshToken,
						provider: userData.provider,
					},
					{ withCredentials: true }
				)
				.then(res => {
					console.log(res);
					if (res.status === 200) {
						window.close();
						localStorage.removeItem('codeVerifier');
						localStorage.setItem('accessToken', accessToken);
						localStorage.setItem('idToken', userData.idToken);
						localStorage.setItem('provider', userData.provider);
					}
				})
				.catch(errs => {
					console.log(errs);
					if (errs.response.status === 401 || errs.response.data.includes('NullReferenceException'))
						errorData = 'Invalid email or password';
				});
		} else return;
	};

    useEffect(() => {
		tokenRequest();
	}, []);

	useEffect(() => {
		if (accessToken !== '') {
			externalLogin();
		}
	}, [userData.provider]);
}

export default FacebookCallback;