import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";

const ConfirmEmailCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();

	const searchParams = new URLSearchParams(location.search);
    
	const userId = searchParams.get('userId');
	const token = searchParams.get('token').trim();

    const confirmEmail = async () => {
		if (userId !== '' && token !== '') {
			await axios.post(
					'https://localhost:7154/api/auth/confirm-email',
					{
						userId,
                        token,
                    },
					{ withCredentials: true, headers: { 'content-type': 'application/json' } }
				)
				.then(res => {
					console.log(res);
					if (res.status === 204) {
						navigate(PATHS.auth);
					}
				});
		}
	};

    useEffect(() => {
		confirmEmail();
	}, []);

}

export default ConfirmEmailCallback;