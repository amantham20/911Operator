import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

import Dashboard from './Dashboard';

import MainPage from './MainPage';
import About from './About';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}

    <BrowserRouter >
      <Routes>
        <Route path="/911Operator">
          <Route index element={<MainPage />} />
          <Route path="/911Operator/emergency/:id" element={<Dashboard />} />
          <Route path="/911Operator/oldlayout" element={<App />} />
          <Route path="/911Operator/About" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
