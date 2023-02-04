import React from 'react'
import { Navbar } from 'react-bootstrap'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import Navigation from './components/Navigation'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navigation/>
    <App />
  </React.StrictMode>,
)
