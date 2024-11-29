import { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { getExternalTokens } from "../../store/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../../context/auth";
import axios from "axios";
import { PATHS } from "../../constants/paths";
import { useAuth } from "../../hooks/useAuth";

const Auth0Callback = ({provider}) => {

    const location = useLocation();
	const navigate = useNavigate();

	const { tokenRequest, externalLogin } = useAuth();
	const searchParams = new URLSearchParams(location.search);

    const authState = useSelector(state => state.auth);

	const code = searchParams.get('code');
	const codeVerifier = localStorage.getItem('codeVerifier');
    const accessToken = authState.accessToken;
	const refreshToken = authState.refreshToken;

    
	

    

    useEffect(() => {
		if (provider && !accessToken) {
			console.log('provider', provider);
			tokenRequest(code, provider, codeVerifier);
		}
	}, [provider, accessToken]);

	useEffect(() => {
		if (provider && authState.idToken) {
			externalLogin();
		}
	}, [provider, authState.idToken]);

	useEffect(() => {
		if (refreshToken === '') {
			localStorage.removeItem('refreshToken');
		}
	},[refreshToken]);

}

export default Auth0Callback;