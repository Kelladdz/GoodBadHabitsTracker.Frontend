const tokenMiddleware =  store => next => async action => {
    const state = store.getState();
    const { accessToken, refreshToken } = state.auth;

    // if (accessToken) {
    //     const decodedToken = jwtDecode(accessToken);
    //     const currentTime = Date.now().valueOf() / 1000;
    //     console.log(accessToken, refreshToken, decodedToken, currentTime);
    //     if (decodedToken.exp > currentTime) {
    //         // Token wygasł
    //         if (refreshToken) {
    //             // Odśwież token
    //             await axios
	// 				.post(
	// 					'https://localhost:7033/api/auth/token/refresh',
	// 					{
	// 						refreshToken: localStorage.getItem('refreshToken'),
	// 					},
	// 					{ withCredentials: true },
    //                     {headers: { 'Authorization': localStorage.getItem('accessToken') }}
	// 				)
	// 				.then(res => {
	// 					store.dispatch(login(res.data));
	// 				});
    //         } else {
    //             // Wyloguj użytkownika
    //             store.dispatch(logout());
    //         }
    //     }
    // }

    return next(action);
};

export default tokenMiddleware;