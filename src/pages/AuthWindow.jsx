import { Outlet } from 'react-router-dom';

import { AuthProvider } from '../context/auth';

import Logo from '../assets/svg/logo-auth.svg';

import styles from '../styles/AuthWindow.module.css';

const AuthWindow = () => {
	return (
		<div style={{position: 'relative', height: '100vh'}}>
			<div className={styles['auth-window']}>
				<img className={styles.logo} src={Logo} alt='Logo'/>
				<h2 className={styles.welcome}>I'm glad you took matters into your own hands!</h2>
				<Outlet />
			</div>
			
		</div>
	)
}

export default AuthWindow;