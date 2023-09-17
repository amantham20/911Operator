import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import profilePreview from './components/ProfilePreview';

import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Dashboard from './Dashboard';
import MainPage from './MainPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>
  {/* <Dashboard /> */}
  <BrowserRouter>
  <Routes>
    <Route path="/">
      <Route index element={<MainPage />} />
      <Route path="/emergency/:id" element={<Dashboard />} />
    </Route>
  </Routes>
  </BrowserRouter>

</>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

