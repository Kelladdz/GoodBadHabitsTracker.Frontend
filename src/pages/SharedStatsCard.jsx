import React, { useMemo,useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthDebug from '../AuthDebug';

import Logo from '../assets/svg/logo-auth.svg';

import styles from '../styles/SharedStatsCard.module.css';
import { useAuth } from '../hooks/useAuth';
import AuthContext from '../context/auth';
import { PATHS } from '../constants/paths';

const SharedStatsCard = () => {
	

	return (
			<div className={styles['shared-stats-card']}>
				<img className={styles.logo} src={Logo} alt='Logo'/>
                <SharedNameInput />
                <SharedIconBox/>
			</div>
	)
}

export default SharedStatsCard;