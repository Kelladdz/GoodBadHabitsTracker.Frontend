import React, { useMemo,useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthDebug from '../AuthDebug';

import Logo from '../assets/svg/logo-auth.svg';

import styles from '../styles/AuthWindow.module.css';
import { useAuth } from '../hooks/useAuth';
import AuthContext from '../context/auth';
import { PATHS } from '../constants/paths';

const AuthWindow = () => {
	

	return (
		<div style={{position: 'relative', height: '100vh'}}>
			<div className={styles['auth-window']}>
				<img className={styles.logo} src={Logo} alt='Logo'/>
				<h2 className={styles.welcome}>I'm glad you took matters into your own hands!</h2>
				<Outlet />
				
			</div>
			<AuthDebug />
		</div>
	)
}

export default AuthWindow;