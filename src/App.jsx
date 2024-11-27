import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Lottie from 'lottie-react';

import PrivateRoute from './PrivateRoute';
import AuthWindow from './pages/AuthWindow';
import Home from './pages/Home';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-in/SignUp';
import Auth0Callback from './components/sign-in/Auth0Callback';
import ForgetPassword from './components/sign-in/ForgetPassword';
import ForgotPasswordCheckEmail from './components/sign-in/ForgotPasswordCheckEmail';
import ResetPassword from './components/sign-in/ResetPassword';
import ConfirmEmailCallback from './components/sign-in/ConfirmEmailCallback';

import loadingAnimationData from './assets/animations/loading-animation.json';
import { PATHS } from './constants/paths';

import './App.css'

function App() {
  const accessToken = useSelector(state => state.auth.accessToken);

  const router = createBrowserRouter([
    {
            path: PATHS.main,
            element: <PrivateRoute/>,
            children: [
                    {index: true, element: <Home/>}
            ]

    },
    {
            path: PATHS.auth,
            element: <AuthWindow/>,
            children: [
                    {index: true, element: <SignIn/>},
                    {path: PATHS.signUp, element: <SignUp/>},
                    {path: PATHS.forgetPassword, element: <ForgetPassword/>},
                    {path: PATHS.forgetPasswordConfirmEmail, element: <ForgotPasswordCheckEmail/>},
                    {path: PATHS.resetPassword, element: <ResetPassword/>}
            ]
    },
    { path: PATHS.confirmEmailCallback, element: <ConfirmEmailCallback/>},
    { path: PATHS.googleCallback, element: <Auth0Callback provider='Google'/> },
    { path: PATHS.facebookCallback, element: <Auth0Callback provider='Facebook'/> },
]);

  return (
    <Suspense fallback={<Lottie animationData={loadingAnimationData} />}>
      <RouterProvider router={router}/>
    </Suspense>
  )
  
}

export default App
