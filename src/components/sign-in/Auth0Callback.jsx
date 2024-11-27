import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { getExternalTokens } from "../../store/slices/authSlice";



const Auth0Callback = ({provider}) => {
    const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth);

	const code = searchParams.get('code');
	const codeVerifier = localStorage.getItem('codeVerifier');
    const accessToken = userData.accessToken;

    const tokenRequest = async () => {
		await axios
			.post(
				`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN_LOCALHOST_URL}?provider=${provider}`,
				{
					grantType: 'authorization_code',
					code: code,
					redirectUri: import.meta.env.VITE_REACT_APP_GOOGLE_CALLBACK_LOCALHOST_URL,
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
		if (accessToken !== '') {
			await axios
				.post(import.meta.env.VITE_REACT_APP_EXTERNAL_LOGIN_LOCALHOST_URL,
					{
						accessToken: accessToken,
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
					if (errs.response.status === 401)
						errorData = 'Invalid email or password';
				});
		} else return;
	};

    useEffect(() => {
		accessToken === '' ? tokenRequest() : externalLogin();
	}, [accessToken]);
}

export default Auth0Callback;