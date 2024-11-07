import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Lottie from 'lottie-react';

import PrivateRoute from './PrivateRoute';

import loadingAnimationData from './assets/animations/loading-animation.json';
import { privateRoutes } from './routes';

import './App.css'

function App() {
  return (
    <Suspense fallback={<Lottie animationData={loadingAnimationData} />}>
      <Routes>
        <Route element={<PrivateRoute />}>
          {privateRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  )
  
}

export default App
