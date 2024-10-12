import Lottie from 'lottie-react';
import loadingAnimationData from './assets/animations/loading-animation.json';
import './App.css'
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { privateRoutes } from './routes';

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
