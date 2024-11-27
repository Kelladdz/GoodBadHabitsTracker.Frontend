import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { ProgressLoggerProvider } from './context/progress-logger.jsx'

import AppContainer from './AppContainer.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <ProgressLoggerProvider>
      <AppContainer />
    </ProgressLoggerProvider>,
)
