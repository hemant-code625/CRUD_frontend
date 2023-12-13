import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";

import NotFound from "./NotFound";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </Router>
  </React.StrictMode>,
)
