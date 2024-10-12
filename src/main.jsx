import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppContainer from './AppContainer.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
)
